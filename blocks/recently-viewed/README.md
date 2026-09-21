# recently-viewed

The products the visitor has looked at, kept in the browser (`localStorage`, no backend,
no cookies). Two files:

- `recently-viewed-tracker.tsx`: `RecentlyViewedTracker` goes on the **product page** and
  records `{ slug, name, preview, price }`. Renders nothing.
- `recently-viewed.tsx`: `RecentlyViewed` renders the list wherever the owner wants it
  (start page, product page under the product, cart page).

**Use when** the owner asks for "senast visade", "du tittade nyligen på", or a personal
strip without a recommendation backend.

**Wiring the tracker** (required, once): in the product page component of the site
(`src/app/produkt/[slug]/page.tsx` on the storefronts), after the product has loaded:

```tsx
import RecentlyViewedTracker from '@/components/blocks/recently-viewed-tracker';
<RecentlyViewedTracker slug={product.slug} name={product.name} preview={product.featuredAsset?.preview} price={formatPrice(…)} />
```

Use the site's own price formatter (`@/lib/format-price` on the storefronts) so the
string matches the cards elsewhere. Do not add the tracker to other pages.

**Props (list)**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | default "Senast visade" |
| `take` | number | default 6 |
| `hrefTemplate` | string | default `/produkt/{slug}`; change if the site's product URLs differ |
| `excludeSlug` | string? | on the product page, pass the current slug |
| `items` | `ViewedProduct[]`? | PREVIEW ONLY (the showcase and tests): renders these instead of the browser's history. Never set it on a real page; it would show every visitor the same "recently viewed" list |

**Pitfalls**

- The list is per browser: nothing shows on the first visit, in private windows, or
  when storage is blocked. Do not promise the owner it is "always" there.
- Images are plain `<img>` (the stored preview URL is a Vendure asset); `next/image`
  would need the host whitelisted per URL and the size is unknown.
- Renders `null` on the server; the section appears after hydration. Fine below the fold.
