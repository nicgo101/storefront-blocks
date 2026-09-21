# newsletter

Heading, one line of text, an e-mail field and a button. The block owns the form and the
status message; the site owns what happens with the address.

**Use when** the owner asks for "nyhetsbrev på startsidan", a sign-up box in the footer
area, or a newsletter section on a campaign page.

**Wiring `action`** (required)

The four storefronts already have a newsletter server action at
`@/components/layout/newsletter-actions` (used by `layout/newsletter-form.tsx`). In the
page, import it and pass it through; adapt its return value to `{ ok, message? }` in a
small wrapper if the shapes differ:

```tsx
import { subscribeToNewsletter } from '@/components/layout/newsletter-actions';
<Newsletter action={async (fd) => { 'use server'; const r = await subscribeToNewsletter(fd); return { ok: r.success, message: r.message }; }} />
```

Read the existing action first; its field name may not be `email`. Never write a new
subscription backend for this block and never post to a third-party URL from the client.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | string | |
| `action` | `(FormData) => Promise<{ok, message?}>` | see above |
| `buttonLabel` | string | default "Prenumerera" |
| `consentText` | string | small print; keep it, it is the GDPR notice |
| `variant` | `'band' \| 'card'` | |

**Pitfalls**

- The block is a client component; the `action` passed from a server component must be a
  server action (`'use server'`) or the page will not compile.
- A site without a newsletter backend has nothing to wire: say so instead of faking success.
