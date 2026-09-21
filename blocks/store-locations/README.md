# store-locations

One card per store or office: address, phone, e-mail, opening hours, a note and a map
link. For companies with more than one place. For a single address with an embedded map
use `contact-map`.

**Use when** the owner asks for "våra butiker", "hitta närmaste", several workshops, or
opening hours for more than one place.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | default "Våra butiker" |
| `text` | string? | |
| `locations` | `StoreLocation[]` | `hours` one line each; `note` for exceptions; `mapHref` a Google Maps share link (opens in a new tab) |
| `columns` | `2 \| 3` | |

**Pitfalls**

- Opening hours are code: when the owner changes them in chat, this is the place, and
  the footer and `contact-map` may hold a copy too. Search the repo for the old hours.
- Phone links follow the Swedish rule (leading 0 → +46).
