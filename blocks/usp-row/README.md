# usp-row

A row of three or four short promises with an icon: shipping, returns, support, payment.

**Use when** the owner asks for "fri frakt-raden", "fördelar under hero", trust badges, or a
compact "why us" strip. For longer feature descriptions use `steps` or `usp` cards instead.

**Props**

| prop | type | notes |
|---|---|---|
| `items` | `{icon, title, text?}[]` | 3 or 4 items; the grid is 2 columns on phones, 4 on desktop |
| `icon` | one of `truck shield headset returns leaf star clock card package thumbs` | names from `USP_ICONS` in the file; add a lucide icon there if none fits |
| `variant` | `'band' \| 'plain'` | `band` puts it on the muted background |

**Pitfalls**

- Keep `title` under ~24 characters so it stays on one line at 4 columns.
- Facts here (shipping price, return days, hours) are copy in code: confirm them with the
  owner rather than guessing from the sample text.
