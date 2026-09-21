# faq-accordion

Questions and answers that fold out, built on `ui/accordion`.

**Use when** the owner wants an FAQ section on a page, "frågor och svar" under a product
category, or a folding list of terms. Not for navigation.

**Where the questions come from matters**

- **Code-owned FAQ** (a handful of questions on a landing page): pass `items` in the page.
- **FAQ managed in the connected backend** (the site has a FAQ content tool with
  `faq_group` / `faq_item`): do not copy the questions into code. Fetch them in the page
  and pass the result as `items`, or point the owner to the site's existing FAQ page.
  Hardcoding backend content is the mistake this note exists to prevent.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | default "Vanliga frågor"; pass `null` to hide (`undefined` keeps the default) |
| `text` | string? | intro under the heading |
| `items` | `{q, a}[]` | `a` is plain text; for rich answers change `AccordionContent`'s child in the copy |
| `type` | `'single' \| 'multiple'` | `single` closes the previous answer |
| `width` | `'narrow' \| 'wide'` | narrow (~48rem) for long answers |

**Pitfalls**

- Answers are rendered as text, not HTML. Line breaks need `whitespace-pre-line` on the
  content or a small change in the copy.
- Do not give two accordions on one page the same `value` prefix if they share a parent
  `Accordion`; here each block has its own.
