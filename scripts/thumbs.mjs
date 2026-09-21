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
    // 'load', not 'networkidle': sample images come from picsum and can trickle for a
    // long time; the block's own layout is settled once the document has loaded.
    await page.goto(`${base}/b/${id}`, { waitUntil: 'load', timeout: 60_000 });
    await Promise.race([page.evaluate(() => document.fonts.ready), new Promise((r) => setTimeout(r, 3000))]);
    // 'attached', not 'visible': a block made of fixed elements (sticky-cta) leaves the
    // wrapper with zero height, which Playwright counts as invisible.
    const el = page.locator('[data-block]');
    await el.waitFor({ state: 'attached', timeout: 15_000 });
    // Async blocks stream in after load and images change the layout: wait for every
    // image in the block to settle, then for the block's height to hold still.
    await Promise.race([
      page.evaluate(() => Promise.all([...document.querySelectorAll('[data-block] img')].map((i) => i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))),
      new Promise((r) => setTimeout(r, 15_000)),
    ]);
    let box = await el.boundingBox(), stable = 0;
    for (let i = 0; i < 40 && stable < 3; i++) {
      await page.waitForTimeout(250);
      const next = await el.boundingBox();
      stable = next && box && Math.abs(next.height - box.height) < 1 ? stable + 1 : 0;
      box = next;
    }
    // A wrapper under 40 px tall means the block draws outside normal flow: take the viewport.
    const clip = box && box.height >= 40
      ? { x: 0, y: Math.max(0, box.y), width: WIDTH, height: Math.min(MAX_H, Math.ceil(box.height)) }
      : { x: 0, y: 0, width: WIDTH, height: HEIGHT };
    await page.screenshot({ path: out, clip, fullPage: true });
    console.log(`✓ ${id} → blocks/${id}/thumb.png (${clip.width}×${clip.height})`);
  }
} finally {
  await browser.close();
  if (server) {
    // A shell-spawned `next start` is a process tree; on Windows only taskkill /T reaches
    // the node inside it, and node keeps waiting for a ref'd child, so unref as well.
    if (process.platform === 'win32') execSync(`taskkill /PID ${server.pid} /T /F`, { stdio: 'ignore' });
    else server.kill();
    server.unref();
  }
}
if (!ids.every((id) => existsSync(join(root, 'blocks', id, 'thumb.png')))) process.exit(1);
