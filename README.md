# storefront-blocks

Tested, ready-made sections ("blocks") that the site editor's webmaster copies into a
Next.js storefront instead of writing them from scratch. Spec and plan live in
`site-editor-engine/docs/superpowers/{specs,plans}/2026-09-21-component-library*.md`.

A block is **source code**, shadcn-style: the agent copies the file into the site's repo
under `src/components/blocks/` and adapts the copy. The site owns it afterwards. There is
no npm package and no runtime dependency on this repo.

```
blocks/<id>/
  block.json      manifest entry: name/summary (Swedish, for the owner), category, tier,
                  files → targets, uses.{ui,packages,site}, props
  <id>.tsx        the block (default export)
  sample.ts       `export const sample = {...}` — props the showcase and tests render with
  README.md       for the agent (English): when to use, props, variants, pitfalls
  thumb.png       1280 px screenshot from the showcase, committed (npm run thumbs)
manifest.json     generated from all block.json (npm run manifest), committed
showcase/         Next 16 app rendering every block: /  and  /b/<id>
scripts/          build-manifest, check-design (the storefronts' gate, baseline 0), thumbs
```

## Block rules

They are what lets one file look right on every site it is copied into. The gate
(`npm run check`) measures them.

1. **Semantic tokens only.** `bg-background text-foreground bg-card text-card-foreground
   bg-primary text-primary-foreground bg-secondary bg-muted text-muted-foreground bg-accent
   border-border ring-ring bg-destructive bg-popover`. Never a site's own token
   (`ink`, `paper`, `chalkboard`, …), never hex, never arbitrary sizes or fonts.
2. **Imports only from** `react`, `next/*`, `@/components/ui/*`, `@/lib/utils`,
   `lucide-react`, `embla-carousel-react`, `@nicgo101/storefront-commerce/*`, plus the site
   files a `shop` block lists under `uses.site` (`@/components/commerce/product-card`,
   `product-carousel`). Every consuming storefront already has all of these; the agent may
   not add dependencies.
3. **Two tiers.** `generic`: props in, no data. `shop`: server component that fetches through
   `storefront-commerce` (`'use cache'`, `cacheLife('hours')`, `cacheTag`, errors caught
   *inside* the cached scope with `cacheLife('seconds')`, empty list on failure).
4. **Swedish sample text as prop defaults**, no em dashes in visible copy (use `,` or ` - `).
5. **`'use client'` only where interaction needs it.**
6. **Default export** the block component; `sample.ts` exports `sample` with every
   required prop.

## Adding a block

1. `blocks/<id>/` with the files above; `id` is `^[a-z][a-z0-9-]{0,40}$` and names the
   directory, the main file and the target.
2. A render test `blocks/<id>/<id>.test.tsx` (vitest + testing-library; shop blocks run
   against `showcase/src/lib/commerce-mock.ts`).
3. `npm run check` green. `npm run thumbs -- <id>` and commit the PNG.
4. Smoke it in a real storefront: copy to its `target`, `tsc --noEmit`, `npm run check-design`.

## Development

```bash
npm ci                 # needs a read-only GitHub Packages token for @nicgo101/* in ~/.npmrc
npm run dev            # showcase on http://localhost:3910
npm run check          # manifest + tsc + eslint + check-design + vitest
npm run thumbs         # builds the showcase, screenshots every block with Playwright
```

## On a box

```bash
git clone https://github.com/nicgo101/storefront-blocks /opt/storefront-blocks
# engine config: "componentLibrary": { "path": "/opt/storefront-blocks" }
cd /opt/storefront-blocks && git pull     # update; a running sandbox sees files at once
```

The engine mounts the directory read-only at `/library` in every site sandbox, serves the
manifest and thumbnails to the editor, and tells the webmaster to read
`/library/manifest.json` before building a section.

## Status

- 2026-09-21: 15 blocks (12 generic, 3 shop), showcase, gate and thumbnails. Smoke-tested by
  copying every block to its target in the gm and pv storefronts: `tsc --noEmit` and
  `check-design` green in both. Two things that differed between sites and shaped the
  blocks: `ProductCard` takes only `product` (pv has no `index`), and `ProductCarousel`'s
  `variant` values differ (va `inverted`, gm/pv `chalkboard`), so the blocks pass neither.
  Engine side (mount, routes, prompt, glass drawer) is the next step in the plan.
