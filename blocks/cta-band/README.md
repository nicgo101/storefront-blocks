# cta-band

A full-width band with a heading, one line of text and one button.

**Use when** the owner wants "en knapp längst ner", a contact prompt before the footer, a
newsletter teaser that links to a page (for an inline form use `newsletter`), or a bridge
between two sections.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string | short; wraps to two lines on phones |
| `text` | string? | one sentence |
| `button` | `{label, href}` | |
| `tone` | `'primary' \| 'muted'` | `primary` = brand background with light text and a secondary-styled button so it stays readable on every site's primary colour |

**Pitfalls**

- On `primary` the button uses `variant="secondary"` on purpose. Do not change it to
  `default`: a primary button on a primary band disappears on some sites.
- One band per page. Two in a row look like an error.
