#!/usr/bin/env node
/**
 * Design gate for blocks. A copy of the storefronts' `scripts/check-design.mjs`
 * (va-vendure, 2026-09) with the baseline pinned at zero and one extra rule:
 * a block may use only the semantic shadcn tokens, never a site's own token
 * names, because the same file has to look right on every site it is copied into.
 *
 * Run: npm run check-design   (--update-baseline is deliberately not supported)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'blocks');

function stripNonCopy(text) {
  text = text.replace(/\/\*[\s\S]*?\*\//g, '');
  text = text.replace(/(^|[^:"'`])\/\/[^\n]*/g, '$1');
  text = text.split('\n').map((l) => (/\b(?:console|logger)\s*\./.test(l) ? '' : l)).join('\n');
  return text;
}

const RULES = [
  { id: 'arbitrary-font-size', rx: /text-\[[0-9.]+(px|rem|em)\]/g, msg: 'Arbitrary font size - use a standard Tailwind step' },
  { id: 'em-dash-in-copy', rx: /—/g, pre: stripNonCopy, msg: 'Em-dash in visible copy - use a comma or " - "' },
  { id: 'arbitrary-tracking', rx: /tracking-\[[^\]]+\]/g, msg: 'Arbitrary letterspacing - use a standard tracking step' },
  { id: 'hex-in-classname', rx: /(?:text|bg|border|stroke|fill|from|via|to|decoration|outline|ring|shadow)-\[#[0-9a-fA-F]{3,8}\]/g, msg: 'Hardcoded hex color in className - use a semantic token' },
  { id: 'arbitrary-font-family', rx: /font-\[(?:'|")?[A-Za-z]/g, msg: 'Arbitrary font family - inherit the site\'s' },
  {
    id: 'site-token',
    rx: /\b(?:bg|text|border|ring|from|to|via|fill|stroke|outline|decoration|shadow)-(?:ink|paper|chalk|board|gm|harvest|answer|signal|hairline|rule|green-deep|green-pale|card-cream)(?:-[a-z]+)*\b/g,
    msg: 'Site-specific token - blocks use only the semantic set (background, foreground, card, primary, secondary, muted, accent, border, input, ring, destructive, popover)',
  },
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else if (/\.(tsx|ts|css)$/.test(name) && !/\.test\./.test(name)) yield p;
  }
}

const findings = [];
for (const file of walk(SRC)) {
  const raw = readFileSync(file, 'utf8');
  for (const rule of RULES) {
    const text = rule.pre ? rule.pre(raw) : raw;
    for (const m of text.match(rule.rx) ?? []) findings.push({ file: relative(root, file), rule: rule.id, match: m, msg: rule.msg });
  }
}

let failed = false;
for (const rule of RULES) {
  const hits = findings.filter((f) => f.rule === rule.id);
  if (hits.length) {
    failed = true;
    console.error(`\n✘ ${rule.id}: ${hits.length} violation(s) - ${rule.msg}`);
    for (const f of hits) console.error(`    ${f.file}: ${f.match}`);
  } else {
    console.log(`✓ ${rule.id}: clean`);
  }
}
if (failed) { console.error('\nDesign check FAILED.'); process.exit(1); }
console.log('\nDesign check passed.');
