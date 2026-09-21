# feature-highlight

One large image with a heading, a text, three to five points with icons and a button.

**Use when** the owner wants to sell one thing with a list of benefits: a service
agreement, an installation package, a membership, "det här får du". For alternating rows
use `image-text`; for a plain promise strip use `usp-row`.

**Props**

| prop | type | notes |
|---|---|---|
| `eyebrow` | string? | small label above the heading |
| `title` | string | |
| `text` | string? | |
| `image` | image | landscape 5:4 or 4:3 |
| `features` | `{icon?, title, text?}[]` | 3 to 5; icons from `FEATURE_ICONS` (`check truck shield headset returns leaf star clock wrench package`), default check |
| `cta` | `{label, href}`? | |
| `imageSide` | `'left' \| 'right'` | |

**Pitfalls**

- More than five points and the image side runs short; split into two blocks.
