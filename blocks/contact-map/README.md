# contact-map

Address, phone, e-mail and opening hours on the left, an embedded map on the right.

**Use when** the owner asks for "hitta hit", a contact section, "var finns ni", or a map
on the contact page. Not a contact form (that is a separate block, not in this set).

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | string | |
| `address` | `string[]` | one line per element |
| `phone` | string? | shown as written; the link is derived with `toTelHref` (Swedish: leading 0 becomes +46) |
| `email` | string? | |
| `hours` | `string[]`? | one line each |
| `mapEmbedUrl` | string? | Google Maps → Dela → Bädda in en karta → the `src` of the iframe. Only `https://www.google.com/maps/embed?…` URLs; no API key needed. Omit for no map (single column). |

**Pitfalls**

- The map is an iframe from Google: it loads Google's cookies. If the site has a cookie
  consent (the four storefronts do, `components/consent`), gate the iframe behind the
  consent the same way the site gates other embeds, or leave `mapEmbedUrl` out.
- Do not build the embed URL from an address string; ask the owner for the real embed link.
