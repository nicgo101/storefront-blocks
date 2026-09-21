# footer-columns

A site footer: brand and tagline, contact details, social icons, two to four link
columns, and a bottom row with legal links and copyright.

**Use when** a site has no footer yet, or the owner wants the footer rebuilt with columns.
The four storefronts already have their own `components/layout/footer.tsx`; there,
prefer editing it, and use this block only if the owner wants to replace it outright.

**Where it goes**: `src/app/layout.tsx`, as the last child of `<body>`, replacing the
existing footer component if there is one.

**Props**

| prop | type | notes |
|---|---|---|
| `brand` | string | |
| `tagline` | string? | |
| `columns` | `FooterColumn[]` | 2 to 4; each `nav` is labelled by its title |
| `contact` | `{address?[], phone?, email?}` | phone link via the Swedish `toTelHref` rule |
| `social` | `{network, href}[]` | `facebook instagram linkedin youtube tiktok`; icons are inline paths, no icon package needed |
| `legal` | `{label, href}[]` | bottom row |
| `copyright` | string | `{year}` and `{brand}` are replaced |

**Pitfalls**

- Links must point to pages that exist; check `src/app` (the storefronts have
  `/kopvillkor`, `/integritetspolicy`, `/fraktvillkor`, `/returpolicy`, `/faq`, `/kontakt`).
- A newsletter box in the footer is the `newsletter` block placed above this one, not a prop.
