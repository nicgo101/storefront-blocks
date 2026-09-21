# product-carousel-collection (shop)

A swipeable strip of products from one collection, rendered with the site's own
`ProductCarousel` (which uses the site's product card and `ui/carousel`).

**Use when** the owner wants "ett band med produkter", "nyheter som man kan svepa", or a
second product row where a grid would be too tall. For a static grid use
`product-grid-collection`.

**Requires** (check before copying):

- `@nicgo101/storefront-commerce` in the site's `package.json`
- `src/components/commerce/product-carousel.tsx` exporting
  `ProductCarousel({ title, products, variant? })` (all four storefronts have it; `title`
  is required there, and the `variant` values differ per site: va has `inverted`, gm and
  pv have `chalkboard`, so the block passes none. Add one in the copy if the owner wants
  the alternate look.)
- a Vendure shop-api behind the site

**The slug**: see `product-grid-collection`. Unknown slug → the block renders `null`.

**Props**

| prop | type | notes |
|---|---|---|
| `slug` | string | required |
| `title` | string | required; the site's carousel renders it as its heading |
| `take` | number | default 12 |

**Caching** is the same as `product-grid-collection`: keep the `'use cache'` scope with
the catch inside it.
