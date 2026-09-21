# product-grid-collection (shop)

A grid of products from one collection, rendered with the site's own product card.

**Use when** the owner wants "produkter från kategorin X på startsidan", "visa våra
bästsäljare" (a collection the shop maintains), or a product strip on a landing page.
For a horizontal, swipeable strip use `product-carousel-collection`.

**Requires** (check before copying, `uses` in block.json):

- `@nicgo101/storefront-commerce` in the site's `package.json` (the four storefronts have it)
- `src/components/commerce/product-card.tsx` exporting `ProductCard({ product })` (the
  block passes only `product`; gm's optional `index` defaults, pv has none)
- a Vendure shop-api behind the site (`shopApiUrl` in "This site")

**The slug** is the collection's slug in the shop (`/collection/<slug>` on the live site).
Find it with the connected content tools (`list` collections) or from the URL the owner
is looking at. Never invent one: an unknown slug renders nothing (the block returns
`null` on an empty result), and the owner sees a blank spot.

**Props**

| prop | type | notes |
|---|---|---|
| `slug` | string | required |
| `title` | string \| null | default `null` |
| `text` | string? | |
| `take` | number | default 8; the grid is 2/3/4 columns |
| `moreHref` | string \| null | default `/collection/<slug>`; `null` hides the button |
| `moreLabel` | string | default "Visa alla" |

**Caching**: `'use cache'` with `cacheLife('hours')` and `cacheTag('collection-<slug>')`,
the same tag the storefronts revalidate on catalogue changes. The fetch is caught inside
the cached scope with `cacheLife('seconds')` so an outage is not cached for hours. Keep
that structure when you adapt the copy.

**Pitfalls**

- This is an async server component. It cannot be placed inside a client component.
- Product data, prices and stock come from the shop; do not hardcode any of it.
