# team-grid

A grid of people: photo, name, role, optional e-mail and phone.

**Use when** the owner asks for "vi som jobbar här", "personal", "kontakta rätt person",
or an about page with faces.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | default "Vi som jobbar här" |
| `text` | string? | |
| `members` | `TeamMember[]` | `image` is square-cropped; omit it for a neutral placeholder; `alt` defaults to the name |
| `columns` | `2 \| 3 \| 4` | from `md`; phones show 2 |

**Pitfalls**

- Photos and contact details of staff are personal data: use what the owner gives you,
  never fill in from elsewhere.
- Phone links follow the Swedish rule (leading 0 → +46) via `toTelHref`, same as `contact-map`.
