# image-text

Rows of image + heading + text (+ optional button), the image side alternating per row.

**Use when** the owner asks for "om oss-sektion", "bild och text bredvid varandra", a
features tour, "så jobbar vi", or a story page. For three short promises use `usp-row`;
for one hero use `hero-image`.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | section heading; default `null` |
| `items` | `ImageTextItem[]` | one row each; `image.width/height` are source pixels |
| `start` | `'image-left' \| 'image-right'` | side of the first image |
| `cta` | `{label, href}`? per item | outline button |

**Pitfalls**

- Images with the same aspect ratio (4:3 or 3:2) keep the rows even; mixed ratios make the
  page jump. Crop in the media library or pass matching sizes.
- Rows stack on phones with the image first; keep `text` to two or three sentences.
