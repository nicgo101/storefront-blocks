# testimonials

Customer quotes in cards with name, place and a star rating. One `ui/carousel` for every
width: three cards side by side from `lg`, swipeable on phones.

**Use when** the owner asks for "kundomdömen", "recensioner på startsidan", quotes, or
social proof next to `stats-row`.

**If the site has a reviews backend** (a connected content tool with reviews, or the
`vendure-plugin-reviews` on the storefront), do not copy quotes into code: fetch them in
the page and pass them as `items`. Hand-typed quotes are for sites without reviews.

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | default "Vad kunderna säger"; `null` hides |
| `text` | string? | |
| `items` | `{quote, name, role?, rating?}[]` | `rating` 1 to 5 draws stars with an `aria-label`; `role` is shown after the name (a town, a company) |

**Pitfalls**

- Arrows appear only from `md` and only with more than three items; with three or fewer
  the block is a plain grid on desktop.
- Real names need the customer's consent. Initials and a town are the safe default.
