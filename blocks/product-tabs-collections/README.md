# product-tabs-collections (shop)

Tabs ("Nyheter", "Kampanj", "Bästsäljare") with a product grid under each, one collection
per tab. Grids are fetched and rendered on the server; only the tab switch is client-side
(`ui/tabs`).

**Use when** the owner wants several product groups in one place on the start page
without stacking three grids. For one group use `product-grid-collection`.

**Requires** `@nicgo101/storefront-commerce`, `ui/tabs`,
`src/components/commerce/product-card.tsx` (`ProductCard({ product })`), a shop-api.

**Slugs**: one collection slug per tab, found with the content tools. A tab whose
collection returns nothing is dropped silently; all empty → the block renders `null`.
The storefronts keep a data-driven best-seller collection (`populara-produkter`) and a
campaign collection (slug in `src/lib/menu-config.ts`); read those before choosing.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `tabs` | `{label, slug}[]` | 2 to 5 |
| `take` | number | per tab, default 8 |
| `moreLabel` | string \| null | "Visa alla" link under each grid; `null` hides |

**Pitfalls**

- Every tab is fetched at render (cached an hour under `collection-<slug>`); five tabs of
  24 products is fine, more is a slower page.
- Keep the `'use cache'` scope with the catch inside it.
