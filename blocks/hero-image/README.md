# hero-image

A start-page hero: headline, a short text, one or two buttons, one image.

**Use when** the owner wants a "big picture at the top", a campaign banner with a button,
or a new start page opening. Not for a product page (the product page has its own header).

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string | one line on desktop; keep under ~50 characters |
| `text` | string? | one or two sentences |
| `image` | `{src, alt, width, height}` | `width`/`height` are the source pixels, required by `next/image`. A repo image: `/uploads/x.jpg` with its real size (`identify` or the media library's numbers). A Vendure asset: its `https` URL. |
| `primary` | `{label, href}` | main button |
| `secondary` | `{label, href}`? | outline button |
| `layout` | `'split' \| 'centered'` | `split` = text left / image right, stacked on phones. `centered` = text over the full-width image with a translucent wash |

**Pitfalls**

- Only one `<h1>` per page: if the page already has one, wrap the block's title by passing
  a shorter title and keep the page's heading structure, or place the block first.
- `centered` needs a calm image; busy photos make the text hard to read even with the wash.
- The image gets `priority` (it is above the fold). Do not add a second `priority` image on
  the same page.
