#!/usr/bin/env node
/**
 * Full-page screenshots of the example pages → docs/exempel-<page>.png.
 * Reuses a running showcase when THUMBS_URL is set, else builds and starts one.
 *
 *   npm run example-shots
 */
import { join, dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawn, execSync } from 'node:child_process';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['startsida', 'om-oss', 'kontakt'];
const PORT = 3912;

let server = null;
let base = process.env.THUMBS_URL;
if (!base) {
  execSync('npx next build showcase', { cwd: root, stdio: 'inherit' });
  server = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['next', 'start', 'showcase', '--port', String(PORT)], { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
  base = `http://127.0.0.1:${PORT}`;
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(base + '/'); if (r.ok) break; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 500));
  }
}

mkdirSync(join(root, 'docs'), { recursive: true });
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light' });
  const page = await ctx.newPage();
  for (const p of PAGES) {
    await page.goto(`${base}/exempel/${p}`, { waitUntil: 'load', timeout: 60_000 });
    await Promise.race([
      page.evaluate(() => Promise.all([...document.images].map((i) => i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))),
      new Promise((r) => setTimeout(r, 15_000)),
    ]);
    await page.waitForTimeout(1000);
    const out = join(root, 'docs', `exempel-${p}.png`);
    await page.screenshot({ path: out, fullPage: true });
    console.log(`✓ /exempel/${p} → docs/exempel-${p}.png`);
  }
} finally {
  await browser.close();
  if (server) {
    if (process.platform === 'win32') execSync(`taskkill /PID ${server.pid} /T /F`, { stdio: 'ignore' });
    else server.kill();
    server.unref();
  }
}
