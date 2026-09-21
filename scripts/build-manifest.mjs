#!/usr/bin/env node
/**
 * blocks/<id>/block.json → manifest.json (+ showcase/src/generated/blocks.ts).
 *
 * Validates every entry (schema, id = directory name, files exist, unique
 * targets, `uses.site` imports actually used) and fails the build on the first
 * error list. The engine re-validates the manifest on the box (its own copy of
 * these rules lives in site-editor-engine/src/lib/blocks.js); keep the two in step.
 */
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOCKS = join(root, 'blocks');
const ID_RE = /^[a-z][a-z0-9-]{0,40}$/;
const CATEGORIES = new Set(['hero', 'content', 'media', 'social-proof', 'commerce', 'contact', 'navigation']);
const TIERS = new Set(['generic', 'shop']);
const SITE_IMPORT_RE = /from\s+['"](@\/components\/(?!ui\/)[^'"]+)['"]/g;

const errors = [];
const blocks = [];
const targets = new Map();

function str(v, max) { return typeof v === 'string' && v.trim().length > 0 && v.length <= max; }
function strArr(v) { return Array.isArray(v) && v.every((s) => typeof s === 'string' && s.length > 0); }

for (const id of readdirSync(BLOCKS).sort()) {
  const dir = join(BLOCKS, id);
  if (!statSync(dir).isDirectory()) continue;
  const at = `blocks/${id}`;
  if (!ID_RE.test(id)) { errors.push(`${at}: directory name is not a valid id (${ID_RE})`); continue; }
  const jsonPath = join(dir, 'block.json');
  if (!existsSync(jsonPath)) { errors.push(`${at}: block.json missing`); continue; }
  let b;
  try { b = JSON.parse(readFileSync(jsonPath, 'utf8')); } catch (e) { errors.push(`${at}: block.json: ${e.message}`); continue; }

  if (b.id !== id) errors.push(`${at}: "id" must equal the directory name`);
  if (!Number.isInteger(b.version) || b.version < 1) errors.push(`${at}: "version" must be a positive integer`);
  if (!str(b.name, 80)) errors.push(`${at}: "name" (Swedish, ≤80 chars) missing`);
  if (!str(b.summary, 400)) errors.push(`${at}: "summary" (Swedish, ≤400 chars) missing`);
  if (!CATEGORIES.has(b.category)) errors.push(`${at}: "category" must be one of ${[...CATEGORIES].join(', ')}`);
  if (!TIERS.has(b.tier)) errors.push(`${at}: "tier" must be generic or shop`);
  if (!Array.isArray(b.files) || b.files.length === 0) errors.push(`${at}: "files" must list at least the block file`);
  else {
    for (const f of b.files) {
      if (!f || typeof f.path !== 'string' || typeof f.target !== 'string') { errors.push(`${at}: every file needs "path" and "target"`); continue; }
      for (const p of [f.path, f.target]) {
        if (p.startsWith('/') || p.split(/[\\/]/).includes('..') || p.includes('\\')) errors.push(`${at}: "${p}" must be a relative posix path without ..`);
      }
      if (!existsSync(join(dir, f.path))) errors.push(`${at}: file "${f.path}" does not exist`);
      if (!f.target.startsWith('src/components/blocks/')) errors.push(`${at}: target "${f.target}" must be under src/components/blocks/`);
      if (targets.has(f.target)) errors.push(`${at}: target "${f.target}" is also used by ${targets.get(f.target)}`);
      targets.set(f.target, at);
    }
  }
  const uses = b.uses ?? {};
  for (const k of ['ui', 'packages', 'site']) if (uses[k] !== undefined && !strArr(uses[k])) errors.push(`${at}: "uses.${k}" must be an array of strings`);
  if (b.tier === 'shop' && !(uses.packages ?? []).includes('@nicgo101/storefront-commerce')) errors.push(`${at}: a shop block must list @nicgo101/storefront-commerce under uses.packages`);
  if (!str(b.thumbnail, 100) || b.thumbnail.includes('/')) errors.push(`${at}: "thumbnail" must be a file name in the block directory`);
  else if (!existsSync(join(dir, b.thumbnail))) console.warn(`! ${at}: thumbnail "${b.thumbnail}" not generated yet (npm run thumbs)`);
  if (!existsSync(join(dir, 'README.md'))) errors.push(`${at}: README.md missing`);
  if (!existsSync(join(dir, 'sample.ts'))) errors.push(`${at}: sample.ts missing (showcase props)`);
  if (!existsSync(join(dir, `${id}.tsx`))) errors.push(`${at}: ${id}.tsx missing`);
  if (Array.isArray(b.props)) {
    for (const p of b.props) if (!p || !str(p.name, 60) || !str(p.type, 400)) errors.push(`${at}: every prop needs "name" and "type"`);
  }

  // uses.site ↔ actual `@/components/...` imports (ui excluded) must agree.
  const declared = new Set(uses.site ?? []);
  const found = new Set();
  for (const f of b.files ?? []) {
    if (typeof f?.path !== 'string' || !existsSync(join(dir, f.path))) continue;
    const src = readFileSync(join(dir, f.path), 'utf8');
    for (const m of src.matchAll(SITE_IMPORT_RE)) found.add(m[1]);
  }
  for (const s of found) if (!declared.has(s)) errors.push(`${at}: imports ${s} but does not list it under uses.site`);
  for (const s of declared) if (!found.has(s)) errors.push(`${at}: uses.site lists ${s} but no file imports it`);

  blocks.push({ ...b, dir: posix.join('blocks', id) });
}

if (errors.length) {
  console.error('manifest: ' + errors.length + ' error(s)\n  ' + errors.join('\n  '));
  process.exit(1);
}

let version = 'dev';
try { version = execSync('git rev-parse --short HEAD', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || 'dev'; } catch { /* no git yet */ }

const manifest = { version, builtAt: new Date().toISOString(), blocks };
writeFileSync(join(root, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

// Explicit imports for the showcase: template dynamic imports are fragile under
// Turbopack, a generated registry is not.
const gen = join(root, 'showcase', 'src', 'generated');
mkdirSync(gen, { recursive: true });
const lines = [
  '// GENERATED by scripts/build-manifest.mjs. Do not edit.',
  'import type { ComponentType } from "react";',
  'export type BlockEntry = { load: () => Promise<{ default: ComponentType<Record<string, unknown>> }>; sample: () => Promise<{ sample: Record<string, unknown> }> };',
  'export const blocks: Record<string, BlockEntry> = {',
  ...blocks.map((b) => `  ${JSON.stringify(b.id)}: { load: () => import("@/components/blocks/${b.id}/${b.id}"), sample: () => import("@/components/blocks/${b.id}/sample") },`),
  '};',
  '',
];
writeFileSync(join(gen, 'blocks.ts'), lines.join('\n'));
console.log(`manifest: ${blocks.length} block(s), version ${version}`);
