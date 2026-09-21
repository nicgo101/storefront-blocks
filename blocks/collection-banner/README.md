# collection-banner (shop)

A banner for one collection: its name, its featured image and a button to the collection
page. Name and image come from the shop unless overridden.

**Use when** the owner wants "en banner för kategorin X", a campaign entry to a category,
or a visual link between two product sections.

**Requires** `@nicgo101/storefront-commerce` (its `cached` loader `getTopCollections`,
tagged `collections`) and a Vendure shop-api. No site files.

**The slug**: see `product-grid-collection`. The block only finds collections that
`getTopCollections` returns (top-level collections only, cached for a day under the
`collections` tag); for a child collection pass `title` and `image` explicitly. With neither a match nor a
`title` the block renders `null`.

**Props**

| prop | type | notes |
|---|---|---|
| `slug` | string | required; the button always links to `/collection/<slug>` |
| `title` | string? | overrides the shop's name |
| `text` | string? | |
| `image` | `{src, alt, width, height}`? | overrides the featured asset; a repo image or a Vendure asset URL |
| `buttonLabel` | string | default "Se hela sortimentet" |
| `layout` | `'wide' \| 'card'` | wide = text over a full-width image with a wash; card = image left, text right |

**Pitfalls**

- The featured image is used at 1600×700 as a cover; a portrait featured asset will be
  cropped. Pass `image` for control.
- `wide` layout needs a calm image for the text to stay readable.
