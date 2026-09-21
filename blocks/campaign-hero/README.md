# campaign-hero (shop)

A hero for a campaign: name and image from the campaign collection in the shop, a button
to the collection page and an optional countdown that disappears when the date has passed.
Two files: the server hero and a small client countdown.

**Use when** the owner asks for "kampanjbanner på startsidan", "rea-hero", Black Friday,
or any time-limited offer that lives as a collection in the shop. For an always-on hero
use `hero-image`; for a category without a countdown use `collection-banner`.

**Requires** `@nicgo101/storefront-commerce` and a shop-api. Both files are copied.

**Slug**: the storefronts keep the campaign collection's slug in `src/lib/menu-config.ts`
(`CAMPAIGN_COLLECTION_SLUG`); import it from there rather than typing it again. The block
only finds top-level collections (see `collection-banner`); pass `title` and `image`
explicitly for a child collection.

**Props**

| prop | type | notes |
|---|---|---|
| `slug` | string | required; the button links to `/collection/<slug>` |
| `eyebrow` | string | default "Kampanj" |
| `title`, `text` | string? | `title` overrides the collection name |
| `image` | image? | overrides the featured asset |
| `buttonLabel` | string | default "Se kampanjen" |
| `endsAt` | ISO date-time with offset | `2026-11-30T23:59:00+01:00`; the countdown renders only in the browser and only while time remains |
| `tone` | `'dark' \| 'light'` | wash over the image |

**Pitfalls**

- The countdown hides itself after `endsAt`, the hero does not: remove the block (or the
  page's use of it) when the campaign ends, and say so to the owner.
- Always give `endsAt` a timezone offset; a bare date is parsed as UTC and is off by an hour.
