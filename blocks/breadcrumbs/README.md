# breadcrumbs

The path at the top of a page: home icon, categories, current page. Emits a schema.org
`BreadcrumbList` so search engines show the trail.

**Use when** the owner asks for "brödsmulor", "visa var man är", or the site's category
and content pages lack a trail. The storefronts' product and collection pages may already
have one (`ui/breadcrumb`); check before adding a second.

**Props**

| prop | type | notes |
|---|---|---|
| `items` | `Crumb[]` | in order; the last one is the current page and needs no `href`. Home is added for you |
| `homeLabel`, `homeHref` | | default "Hem" / `/` |
| `jsonLd` | boolean | default `true` |
| `siteUrl` | string? | absolute origin for the JSON-LD urls; find it in the site's `NEXT_PUBLIC_SITE_URL` or "This site" |

**Pitfalls**

- Labels should match the page titles they link to; for shop pages take names from the
  connected content tools rather than typing them.
- One breadcrumb trail per page; two JSON-LD lists confuse search engines.
