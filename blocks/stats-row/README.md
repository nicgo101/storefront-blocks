# stats-row

Two to four big figures with a short label each.

**Use when** the owner wants "siffror som visar att vi är stora", years in business, review
score, customer count. Pair it with `testimonials` for social proof.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string? | centered heading above the row |
| `stats` | `{value, label}[]` | 2 to 4; `value` is a string so the owner controls formatting ("12 000+", "4,8 av 5"); use a non-breaking space in "12 000" if it wraps |
| `variant` | `'plain' \| 'card'` | |

**Pitfalls**

- Figures are claims. Ask the owner for the real numbers; do not keep the sample values.
- `tabular-nums` keeps the digits aligned; do not remove it.
