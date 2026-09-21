# tabs-content

Two to six tabs with text under each, on `ui/tabs`. For related short texts that would be
too long as one section: delivery / returns / warranty, sizing / care / materials.

**Use when** the owner asks for "flikar", "visa leverans och retur på samma ställe", or a
compact info section on a category or landing page. For questions and answers use
`faq-accordion`; for product groups use `product-tabs-collections`.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `tabs` | `ContentTab[]` | `id` is the tab value (letters, digits, dashes); `paragraphs` for plain text or `content` for JSX |
| `defaultTab` | string? | id of the tab that opens first |
| `width` | `'narrow' \| 'wide'` | |

**Pitfalls**

- Client component (Radix tabs): `content` passed as JSX from a server component is fine,
  functions are not.
- Text in tabs is hidden from a visitor who does not click; put the most important tab
  first or set `defaultTab`.
