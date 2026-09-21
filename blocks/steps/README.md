# steps

Three or four numbered steps, each with a title and one sentence.

**Use when** the owner asks for "så funkar det", "så beställer du", a how-it-works strip, or
an ordered process (measure, order, install). For unordered promises use `usp-row`.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string? | default "Så funkar det" |
| `text` | string? | intro |
| `steps` | `{title, text}[]` | 3 or 4; the number badge is generated |
| `layout` | `'row' \| 'list'` | `row` is 3 columns from md; with 4 steps change `md:grid-cols-3` to `md:grid-cols-4` in the copy |

**Pitfalls**

- The badge is `aria-hidden`; the `<ol>` already conveys order to screen readers.
