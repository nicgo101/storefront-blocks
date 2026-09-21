#!/usr/bin/env node
/**
 * Thumbnails: build + start the showcase, screenshot /b/<id> per block with
 * Playwright, write blocks/<id>/thumb.png. Committed, so the box never needs
 * Playwright or the showcase.
 *
 *   npm run thumbs            all blocks
 *   npm run thumbs -- hero-image faq-accordion
 *   THUMBS_URL=http://localhost:3910 npm run thumbs   (reuse a running showcase)
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, execSync } from 'node:child_process';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
const only = process.argv.slice(2);
const ids = manifest.blocks.map((b) => b.id).filter((id) => !only.length || only.includes(id));
const PORT = 3911;
const WIDTH = 1280, HEIGHT = 800, MAX_H = 900;

let server = null;
let base = process.env.THUMBS_URL;
if (!base) {
  console.log('building showcase…');
  execSync('npx next build showcase', { cwd: root, stdio: 'inherit' });
  server = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['next', 'start', 'showcase', '--port', String(PORT)], { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
  base = `http://127.0.0.1:${PORT}`;
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(base + '/'); if (r.ok) break; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 500));
  }
}

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light' });
  const page = await ctx.newPage();
  for (const id of ids) {
    const out = join(root, 'blocks', id, 'thumb.png');
    await page.goto(`${base}/b/${id}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const el = page.locator('[data-block]');
    await el.waitFor();
    const box = await el.boundingBox();
    const clip = { x: 0, y: Math.max(0, box.y), width: WIDTH, height: Math.min(MAX_H, Math.ceil(box.height)) };
    await page.screenshot({ path: out, clip, fullPage: true });
    console.log(`✓ ${id} → blocks/${id}/thumb.png (${clip.width}×${clip.height})`);
  }
} finally {
  await browser.close();
  if (server) server.kill();
}
if (!ids.every((id) => existsSync(join(root, 'blocks', id, 'thumb.png')))) process.exit(1);
