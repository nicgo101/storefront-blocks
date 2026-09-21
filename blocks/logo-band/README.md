# logo-band

A row of brand or partner logos, grey until hovered.

**Use when** the owner asks for "märkena vi säljer", "våra partners", "som synts i", or a
trust strip of logos. Not for product images.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | small uppercase label; default "Märken vi säljer" |
| `logos` | `{src, alt, width, height, href?}[]` | 4 to 8; SVG or PNG with transparent background; `alt` is the brand name and doubles as the link label |
| `tone` | `'gray' \| 'color'` | |

**Pitfalls**

- Logos need real files: ask the owner for them or use the media library; never link to
  a brand's website for the image.
- `href` usually points at the site's own collection for that brand (`/collection/<slug>`),
  found with the connected content tools, not at the brand's site.
