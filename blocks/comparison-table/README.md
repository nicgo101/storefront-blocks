# comparison-table

A table comparing plans or models row by row: check, cross or a short text per cell; one
column can be highlighted and each can have a button.

**Use when** the owner asks for "jämför paketen", "vad ingår", model differences, or a
feature matrix. For price cards without a matrix use `pricing-table`.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `columns` | `ComparisonColumn[]` | 2 to 4; `highlighted` on at most one |
| `rows` | `ComparisonRow[]` | `values` has one entry per column: `true`/`false` → icon with an accessible label, string → shown as written |
| `rowHeader` | string | header of the label column ("Ingår") |

**Pitfalls**

- The table scrolls sideways on phones (min width 40rem); keep to four columns.
- Product specs (weight, power) belong on the product page from the shop; this block is
  for hand-written comparisons of services or packages.
