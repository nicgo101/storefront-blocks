# review-summary

Stars, the average rating and the number of reviews on one line, with a link to the
reviews. As a band across the page or a compact inline row under a hero.

**Use when** the owner asks for "visa vårt betyg", "4,8 av 5 på startsidan", a Trustpilot
or Google score, or social proof right under the hero (`variant="inline"`).

**Where the numbers come from**: ask the owner, or read them from the site's reviews
backend when it has one (the storefronts' reviews plugin through the connected content
tools). Do not type numbers from memory or from the sample; a rating is a claim.

**Props**

| prop | type | notes |
|---|---|---|
| `rating` | number | e.g. 4.7; stars are partially filled |
| `count` | number | formatted with Swedish thousands separators |
| `max` | number | default 5 |
| `source` | string? | "på Trustpilot", "från våra kunder" |
| `href` | string? | reviews page or platform (external opens in a new tab) |
| `linkLabel` | string | default "Läs omdömena" |
| `variant` | `'band' \| 'inline'` | inline renders just a `<p>`, place it inside another block's text column |

**Pitfalls**

- No JSON-LD here on purpose: an `AggregateRating` must be attached to the thing rated
  (a product, the organisation) and search engines penalise free-floating ones. If the
  owner wants it, add it on the page with the right `itemReviewed`.
