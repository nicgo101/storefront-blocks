import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export type Crumb = { label: string; href?: string };

export type BreadcrumbsProps = {
  /** The trail, last item is the current page (no href needed). The home link is added automatically. */
  items: Crumb[];
  homeLabel?: string;
  homeHref?: string;
  /** Emit schema.org BreadcrumbList JSON-LD (search engines show the trail). */
  jsonLd?: boolean;
  /** Absolute site origin for JSON-LD ids, e.g. `https://www.exempel.se`; omitted → relative urls. */
  siteUrl?: string;
};

export default function Breadcrumbs({ items, homeLabel = 'Hem', homeHref = '/', jsonLd = true, siteUrl = '' }: BreadcrumbsProps) {
  const all: Crumb[] = [{ label: homeLabel, href: homeHref }, ...items];
  const ld = jsonLd ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, ...(c.href ? { item: siteUrl + c.href } : {}) })),
  } : null;
  return (
    <nav aria-label="Brödsmulor" className="bg-background">
      <ol className="mx-auto flex max-w-[80rem] flex-wrap items-center gap-1 px-6 py-3 text-sm text-muted-foreground">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 ? <ChevronRight className="size-4 shrink-0" aria-hidden="true" /> : null}
              {last || !c.href
                ? <span aria-current={last ? 'page' : undefined} className={last ? 'font-medium text-foreground' : ''}>{i === 0 ? <><Home className="size-4" aria-hidden="true" /><span className="sr-only">{c.label}</span></> : c.label}</span>
                : <Link href={c.href} className="underline-offset-4 hover:text-foreground hover:underline">{i === 0 ? <><Home className="size-4" aria-hidden="true" /><span className="sr-only">{c.label}</span></> : c.label}</Link>}
            </li>
          );
        })}
      </ol>
      {ld ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /> : null}
    </nav>
  );
}
