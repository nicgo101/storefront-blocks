# product-spotlight (shop)

One product, large: image, name, price from the shop, a selling text written for this
placement and a button to the product page. Cached an hour under `product-<slug>`.

**Use when** the owner wants "månadens produkt", a campaign product on the start page, or
one item featured on a landing page. For several products use `product-grid-collection`.

**Requires** `@nicgo101/storefront-commerce` and a shop-api. No site files: the block links
to the product page instead of adding to the cart (the site's own buy button lives there,
and composite products cannot be quick-added).

**The slug** is the product's slug in the shop (`/produkt/<slug>` on the live site). Find
it with the connected content tools or from the product page the owner is looking at.
Unknown slug → the block renders `null`.

**Props**

| prop | type | notes |
|---|---|---|
| `slug` | string | required |
| `eyebrow` | string? | small label above the name |
| `title` | string? | overrides the product name |
| `text` | string? | selling text for this placement; the product page has the real description, do not duplicate it |
| `image` | image? | overrides the featured asset |
| `buttonLabel` | string | default "Till produkten" |
| `imageSide` | `'left' \| 'right'` | |

**Pitfalls**

- The price shows "från …" when variants differ; it is read from the shop, never typed.
- Keep the `'use cache'` scope with the catch inside it when adapting the copy.
