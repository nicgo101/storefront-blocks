# gallery-lightbox

A grid of images; a click opens the image full-screen in a dialog with a swipeable
carousel (embla: touch, arrows, keyboard left/right), a counter and the caption.

**Use when** the owner asks for "bildgalleri", "bilder från butiken/verkstaden", "klicka
för att förstora", a photo wall on an about page, or project photos. Not for product
images (the product page has its own carousel).

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | default `null` (no heading) |
| `images` | `{src, alt, width, height}[]` | `width`/`height` are the source pixels (required by `next/image`). Repo images: `/uploads/x.jpg` with the size from the media library. Vendure assets: their `https` URL and the width/height the library reports. Both work. |
| `columns` | `2 \| 3 \| 4` | from `md`; phones show 2 |
| `thumbs` | `'square' \| 'natural'` | square crops thumbnails; natural keeps ratios |

**Behaviour**

- The dialog is `ui/dialog` (Radix): focus trap, Escape closes, body scroll locked, close
  button top right. The carousel mounts only while the dialog is open, so `startIndex`
  is the clicked image every time.
- The full-size image is `object-contain` within 85vh; portrait and landscape both fit.
- `alt` is the caption in the lightbox and part of each thumbnail's `aria-label`.

**Pitfalls**

- External image hosts must be allowed in the site's `next.config` `images.remotePatterns`.
  The four storefronts already allow their Vendure asset host; a new host is an
  out-of-scope config change - say so rather than adding it.
- More than ~24 images: consider splitting into sections; every thumbnail is a
  `next/image` request.
