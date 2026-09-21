# category-tiles (shop)

Tiles with image and name for the shop's collections, linking to `/collection/<slug>`.
Names and images come from the shop (`getTopCollections`, cached a day under the
`collections` tag).

**Use when** the owner wants "kategorier på startsidan", "rutor för våra avdelningar", or a
visual entry to the catalogue. For hand-written entries with icons use `cta-cards`.

**Requires** `@nicgo101/storefront-commerce` and a shop-api. No site files.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `slugs` | `string[]`? | which collections, in order; omit for all top-level ones. Only top-level collections are found (see `collection-banner`); unknown slugs are skipped silently |
| `columns` | `2 \| 3 \| 4` | |
| `style` | `'overlay' \| 'below'` | name over the image with a gradient, or under it |

**Pitfalls**

- A collection without a featured image shows a muted tile; tell the owner to set one in
  the shop admin (or through the connected content tools) rather than hardcoding a picture.
- All tiles filtered out (bad slugs) → the block renders `null`; check the slugs with the
  content tools first.
