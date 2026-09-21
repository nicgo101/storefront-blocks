# pricing-table

Two to four plan cards with a name, a price, a feature list and a button. One card can be
highlighted with a badge.

**Use when** the owner sells services or subscriptions next to products (service
agreements, installation packages, rental tiers) and wants "en prislista" or "paket".
Not for product prices: those live in the connected backend and are rendered by the
product components.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | default "Priser"; `null` hides |
| `text` | string? | |
| `plans` | `PricingPlan[]` | `price` and `period` are strings shown as written ("Från 1 200 kr", "Offert"); `features` are plain text lines; `cta.href` usually points to the contact page with a query, or a product page |
| `highlighted` | boolean | lifts the card and fills its button; use on at most one |
| `badge` | string? | label in the card corner ("Populärast") |

**Pitfalls**

- Prices are claims: take them from the owner, never from the sample.
- Four plans fit on desktop only; on tablets they wrap to two rows.
