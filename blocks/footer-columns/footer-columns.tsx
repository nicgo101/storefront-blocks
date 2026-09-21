import { cacheLife } from 'next/cache';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export type FooterColumn = { title: string; links: { label: string; href: string }[] };

export type FooterSocial = { network: 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok'; href: string };

export type FooterColumnsProps = {
  /** Company or site name, top left. */
  brand: string;
  /** One or two sentences under the name. */
  tagline?: string;
  /** Two to four link columns. */
  columns: FooterColumn[];
  contact?: { address?: string[]; phone?: string; email?: string };
  social?: FooterSocial[];
  /** Bottom row links: integritetspolicy, köpvillkor, cookies. */
  legal?: { label: string; href: string }[];
  /** Bottom-left text; `{year}` is replaced by the current year. */
  copyright?: string;
};

const SOCIAL_LABEL: Record<FooterSocial['network'], string> = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn', youtube: 'YouTube', tiktok: 'TikTok' };

/** Brand marks as inline paths: lucide has deprecated its brand icons and sites differ in which they keep. */
const SOCIAL_PATH: Record<FooterSocial['network'], string> = {
  facebook: 'M14 8h2.5V5H14c-2.2 0-3.5 1.4-3.5 3.6V10H8v3h2.5v8h3v-8H16l.5-3h-3V8.9c0-.6.3-.9 1-.9z',
  instagram: 'M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 2A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 5h-9zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm4.8-3.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
  linkedin: 'M6.5 8.5A1.5 1.5 0 1 1 6.5 5.5a1.5 1.5 0 0 1 0 3zM5.2 10h2.6v9H5.2v-9zm4.6 0h2.5v1.2c.4-.7 1.3-1.4 2.7-1.4 2.8 0 3.4 1.8 3.4 4.2V19h-2.6v-4.4c0-1.1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V19H9.8v-9z',
  youtube: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z',
  tiktok: 'M16.5 3c.3 2.1 1.6 3.5 3.5 3.7v3a6.6 6.6 0 0 1-3.5-1.1v6.2A5.2 5.2 0 1 1 11.3 9.6v3.1a2.2 2.2 0 1 0 2.2 2.2V3h3z',
};

export function toTelHref(display: string): string {
  const digits = display.replace(/[^\d+]/g, '');
  return 'tel:' + (digits.startsWith('+') ? digits : digits.startsWith('0') ? '+46' + digits.slice(1) : digits);
}

/**
 * The storefronts run with cacheComponents, where `new Date()` during prerender is an
 * error. Inside a cached scope it is allowed; a day's cache life keeps the year current.
 */
async function currentYear() {
  'use cache';
  cacheLife('days');
  return new Date().getFullYear();
}

export default async function FooterColumns({ brand, tagline, columns, contact, social, legal, copyright = '© {year} {brand}' }: FooterColumnsProps) {
  const year = String(await currentYear());
  // Brand column + link columns; literal class names so Tailwind emits them.
  const GRID = ['md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4', 'md:grid-cols-5'][Math.min(4, Math.max(1, columns.length)) - 1];
  return (
    <footer className="border-t border-border bg-muted text-foreground">
      <div className="mx-auto max-w-[80rem] px-6 py-14">
        <div className={`grid gap-10 ${GRID}`}>
          <div className="md:pr-6">
            <p className="text-lg font-bold">{brand}</p>
            {tagline ? <p className="mt-2 text-sm text-muted-foreground">{tagline}</p> : null}
            {contact ? (
              <address className="mt-4 space-y-1.5 text-sm not-italic">
                {contact.address?.length ? <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>{contact.address.map((l, i) => <span key={i} className="block">{l}</span>)}</span></p> : null}
                {contact.phone ? <p className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><a href={toTelHref(contact.phone)} className="whitespace-nowrap underline-offset-4 hover:underline">{contact.phone}</a></p> : null}
                {contact.email ? <p className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">{contact.email}</a></p> : null}
              </address>
            ) : null}
            {social?.length ? (
              <ul className="mt-5 flex gap-3">
                {social.map((s) => (
                  <li key={s.network}>
                    <a href={s.href} target="_blank" rel="noopener" aria-label={SOCIAL_LABEL[s.network]} className="flex size-9 items-center justify-center rounded-full bg-background text-foreground transition hover:text-primary">
                      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><path d={SOCIAL_PATH[s.network]} /></svg>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {columns.map((c, i) => (
            <nav key={i} aria-label={c.title}>
              <p className="font-semibold">{c.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {c.links.map((l, j) => <li key={j}><Link href={l.href} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">{l.label}</Link></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright.replace('{year}', year).replace('{brand}', brand)}</p>
          {legal?.length ? (
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legal.map((l, i) => <li key={i}><Link href={l.href} className="underline-offset-4 hover:text-foreground hover:underline">{l.label}</Link></li>)}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
