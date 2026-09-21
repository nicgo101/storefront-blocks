# countdown-band

A band with a heading, a live countdown (days, hours, minutes, seconds) and a button. It
renders nothing until mounted in the browser and nothing after `endsAt`.

**Use when** the owner asks for "nedräkning till rean", a launch, an event, or "visa hur
länge kampanjen pågår" without the full `campaign-hero`.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | | |
| `endsAt` | ISO date-time WITH offset | `2026-11-30T23:59:00+01:00`; a bare date is read as UTC and lands an hour off |
| `link` | `{label, href}`? | |
| `tone` | `'primary' \| 'muted'` | |

**Pitfalls**

- The band hides itself when time runs out, but the code stays: remove the block when the
  campaign is over, and tell the owner.
- Ticks every second while visible; fine for one band, do not stack several.
