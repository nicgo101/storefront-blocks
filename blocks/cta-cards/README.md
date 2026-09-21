# cta-cards

Two to four clickable cards with an icon or image, a title and one sentence, each linking
to a page. The whole card is the link.

**Use when** the owner asks for "ingångar på startsidan", "tre rutor som leder vidare",
service/guides/contact shortcuts, or a landing page hub. For shop categories with images
from the shop use `category-tiles` instead.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `cards` | `CtaCard[]` | 2 to 4; `icon` from `CTA_ICONS` (`wrench truck headset book tag leaf star package`) or an `image` (3:2 crop); `linkLabel` defaults to "Läs mer" |

**Pitfalls**

- `href` is a site-relative path to a page that exists; check with `ls src/app` before
  linking, or ask.
- Mixed cards (some with image, some with icon) look uneven; pick one style per row.
