# contact-form

Name, e-mail, phone and message with a send button, a thank-you state and a honeypot.
The block owns the form and its states; the site owns where the message goes.

**Use when** the owner asks for "kontaktformulär", "skicka en förfrågan", a quote request
or a callback form. Pair with `contact-map` on the contact page.

**Wiring `action`** (required)

The four storefronts submit forms to the shop's forms plugin through
`submitForm({ formId, fields, website, clientIp })` from
`@nicgo101/storefront-commerce/forms`, rate-limited per IP (see the site's own
`newsletter-actions.ts` for the pattern). Create a server action in the page and map the
block's field names onto the form the plugin expects. Read the site's existing contact
action first if there is one (`src/app/kontakt/`), and reuse its `formId`:

```tsx
// src/app/kontakt/actions.ts (server action, same shape as newsletter-actions.ts)
'use server';
import { headers } from 'next/headers';
import { rateLimit, clientIpFromHeaders, LIMITS } from '@nicgo101/storefront-commerce/rate-limit';
import { submitForm } from '@nicgo101/storefront-commerce/forms';

export async function sendContact(fd: FormData): Promise<{ ok: boolean; message?: string }> {
  const clientIp = clientIpFromHeaders(await headers());
  if (!rateLimit(`contact:${clientIp}`, LIMITS.contact).ok) return { ok: false, message: 'För många försök. Vänta en stund.' };
  const fields = { namn: String(fd.get('name') ?? ''), epost: String(fd.get('email') ?? ''), telefon: String(fd.get('phone') ?? ''), meddelande: String(fd.get('message') ?? '') };
  const r = await submitForm({ formId: 'kontakt', fields, website: String(fd.get('website') ?? ''), clientIp });
  return { ok: r.success, message: r.message || undefined };
}
```

```tsx
// in the page
<ContactForm action={sendContact} />
```

The `formId` must exist in the shop's forms plugin (the owner or the connected content
tools can tell). Never post to a third-party URL from the client and never mail directly
from the block.

**Props**

| prop | type | notes |
|---|---|---|
| `title`, `text` | string | |
| `action` | `(FormData) => Promise<{ok, message?}>` | see above |
| `fields` | `('name'\|'email'\|'phone'\|'subject'\|'message')[]` | order of fields; `email` and `message` are always present and required |
| `buttonLabel` | string | default "Skicka" |
| `consentText` | string | GDPR notice, keep it |
| `variant` | `'card' \| 'plain'` | |

**Pitfalls**

- Client component: the `action` must be a server action (`'use server'`).
- The honeypot field is named `website`; forward it, the plugin uses it to drop bots.
- A site without a forms backend has nothing to wire: say so instead of faking a send.
