# certifications-row

Three to five certificates or marks, each with its symbol, a name and one sentence about
what it means for the customer. Unlike `logo-band`, every mark is explained.

**Use when** the owner asks for "våra certifieringar", authorised dealer / workshop marks,
Trygg e-handel, ISO, environmental labels, or memberships worth explaining.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | default "Certifieringar och märkningar" |
| `text` | string? | |
| `items` | `Certification[]` | `image` is shown 3.5rem tall (SVG or PNG with transparent background); without one a check badge is drawn; `href` links the mark to the issuer |
| `variant` | `'plain' \| 'band'` | |

**Pitfalls**

- Certification marks have usage rules from the issuer; use the file the owner provides,
  never a copy from the web.
- A claim like "ISO 9001" is the owner's to make; do not invent items from the sample.
