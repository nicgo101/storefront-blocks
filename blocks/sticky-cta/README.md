# sticky-cta

A button that stays at the bottom of the screen: call, book, chat. Mobile only by
default (hidden from `md`), optionally only after the visitor has scrolled.

**Use when** the owner asks for "en ring-oss-knapp som alltid syns på mobilen", a booking
shortcut, or "kontakta oss" that follows the page. Not for a cookie banner or a chat
widget (the sites have their own).

**Where it goes**: `src/app/layout.tsx` inside `<body>`, after the main content, so it is
on every page; or in one page for a page-specific action. Check the site's `.env`/config
for the real phone number and use `toTelHref` if it is given as a display string.

**Props**

| prop | type | notes |
|---|---|---|
| `label` | string | short: "Ring oss", "Boka tid" |
| `href` | string | `tel:+46…`, `mailto:`, `#anchor`, or a path |
| `icon` | `phone chat calendar bag arrow` | |
| `showAfter` | number | pixels scrolled before it appears; 0 = always |
| `on` | `'mobile' \| 'all'` | `all` is a smaller pill bottom right at every width |

**Pitfalls**

- It covers the bottom 4rem of the viewport on mobile: give the page's last section
  enough bottom padding, or the footer's last links end up under the button.
- Only one sticky element per site; the sites' cookie consent and assistant widget also
  sit at the bottom. Look at the page on a phone width before finishing.
