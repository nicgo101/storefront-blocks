# timeline

Entries along a vertical rail: a label (year, date, step), a title, text and an optional
image.

**Use when** the owner asks for "vår historia", "så har vi vuxit", a project timeline, or
an ordered process with dates. For three or four unnamed steps use `steps`.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `items` | `TimelineItem[]` | in order; `label` is free text ("2004", "Steg 1", "Mars") |
| `layout` | `'line' \| 'alternate'` | `alternate` zigzags left/right of the rail from `md`; phones always use the single rail |

**Pitfalls**

- Rendered as an `<ol>`: order is part of the meaning; do not sort it in the copy.
- Images are shown at up to 24rem wide; use landscape crops.
