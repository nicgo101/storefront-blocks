# announcement-bar

A slim bar at the very top of the page with one short message and an optional link. The
visitor can close it; the choice is remembered per browser until `id` changes.

**Use when** the owner asks for "fri frakt-banner högst upp", holiday hours, a campaign
notice, "vi har stängt vecka 30", or a delivery-delay warning.

**Where it goes**: above the header, in `src/app/layout.tsx` (the four storefronts render
the header there). It is a client component; keep it as the first child of `<body>` so it
never pushes the sticky header around.

**Props**

| prop | type | notes |
|---|---|---|
| `text` | string | one line; the bar wraps on phones but keep it short |
| `link` | `{label, href}`? | |
| `dismissible` | boolean | default `true` |
| `id` | string | change it with the message (`'jul-2026'`) so a dismissed bar reappears |
| `tone` | `'primary' \| 'muted'` | |

**Pitfalls**

- Time-limited messages are code: remind the owner to ask you to remove it when the
  campaign ends, or set a reminder in their own calendar. The block does not expire.
- The dismissed state lives in `localStorage` and is read after mount, so server and
  client markup match; do not move that read into render.
