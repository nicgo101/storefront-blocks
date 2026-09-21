# promo-tiles

Two or three large clickable tiles with an image, a heading and a link: campaigns or
departments right under the hero. The whole tile is the link.

**Use when** the owner asks for "två rutor under hero", "kampanjbanners", seasonal entries
(Vår, Sommar), or the classic shop start page grid. For shop categories with images from
the shop use `category-tiles`; for icon cards use `cta-cards`.

**Props**

| prop | type | notes |
|---|---|---|
| `tiles` | `PromoTile[]` | 2 or 3 (extra ones are ignored); `image.alt` may be empty when the title says it all; `tone` per tile |
| `layout` | `'even' \| 'wide'` | with three tiles, `wide` makes the first span two columns |
| `height` | `'short' \| 'tall'` | 16rem or 24rem minimum |

**Pitfalls**

- Text sits over the image: pick calm images or use `tone="light"` with a light wash.
- Time-limited tiles (a sale) stay until removed; note it to the owner.
