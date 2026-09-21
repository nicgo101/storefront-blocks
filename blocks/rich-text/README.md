# rich-text

Running text with headings, lists, quotes and links in the site's typography
(`@tailwindcss/typography`, mapped onto the semantic tokens).

**Use when** the owner asks for an about page, terms, a guide, "en textsida", or a text
section between other blocks. For a short intro under a heading use the `text` prop of the
other blocks instead.

**Content**: pass JSX as `children` (preferred), or an `html` string that comes from the
site's own code or content files. `html` is rendered as-is: never feed it text from a
form, a URL or the connected backend without the site's existing sanitising path (the
storefronts render backend content through their own markdown/MDX pipeline; use that
there).

**Props**

| prop | type | notes |
|---|---|---|
| `title` | string \| null | |
| `eyebrow` | string? | small label above |
| `children` / `html` | | one of them |
| `width` | `'narrow' \| 'wide'` | ~42rem reads best |
| `size` | `'base' \| 'lg'` | |

**Pitfalls**

- Headings inside the text start at `h3` when `title` is an `h2`; keep the page's outline.
- Do not add `text-[…]` or hex classes in the content; the site's design check rejects them.
