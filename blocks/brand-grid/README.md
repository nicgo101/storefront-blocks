# brand-grid (shop)

Tiles with the shop's brands, read from the product search's facet values, each linking
to the search filtered on that brand. No images: brand logos are not in the shop data;
for a logo strip with files from the owner use `logo-band`.

**Use when** the owner asks for "alla märken", "shoppa efter märke", or a brand index.

**Requires** `@nicgo101/storefront-commerce` and a shop-api with a brand facet.

**How it finds the brands**: an unfiltered `SearchProductsQuery` (`take: 1`) returns
every facet value with its product count; the block keeps the ones whose facet `code`
or `name` equals `facet` (default `brand`; check the shop's facets with the connected
content tools if nothing renders). Cached an hour under the `facets` tag.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `facet` | string | default `brand` |
| `names` | `string[]`? | pick and order by name; omit for the largest `take` by product count |
| `take` | number | default 12 |
| `hrefTemplate` | string | default `/search?facets={id}`, the storefronts' search page filter; `{name}` also available |
| `showCount` | boolean | "12 produkter" under the name |
| `columns` | `3 \| 4 \| 6` | phones show 2 |

**Pitfalls**

- Facet value ids differ between shops; never hardcode them, the template gets the id
  at render time.
- Keep the `'use cache'` scope with the catch inside it.
