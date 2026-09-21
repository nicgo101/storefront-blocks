'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readRecentlyViewed, type ViewedProduct } from './recently-viewed-tracker';

export type RecentlyViewedProps = {
  title?: string | null;
  /** How many to show, default 6. */
  take?: number;
  /** Product page pattern; `{slug}` is replaced. */
  hrefTemplate?: string;
  /** Slug of the product on the current page, left out of the list. */
  excludeSlug?: string;
  /** Preview only (showcase, tests): render these instead of the browser's history. Never set on a real page. */
  items?: ViewedProduct[];
};

/** Reads localStorage after mount; renders nothing on the server and when the list is empty. */
export default function RecentlyViewed({ title = 'Senast visade', take = 6, hrefTemplate = '/produkt/{slug}', excludeSlug, items: preset }: RecentlyViewedProps) {
  const [items, setItems] = useState<ViewedProduct[] | null>(preset ?? null);
  useEffect(() => { if (!preset) setItems(readRecentlyViewed().filter((p) => p.slug !== excludeSlug).slice(0, take)); }, [take, excludeSlug, preset]);
  if (!items || !items.length) return null;
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-12 md:py-16">
        {title ? <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2> : null}
        <ul className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 ${title ? 'mt-6' : ''}`}>
          {items.map((p) => (
            <li key={p.slug}>
              <Link href={hrefTemplate.replace('{slug}', encodeURIComponent(p.slug))} className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="block aspect-square overflow-hidden rounded-lg bg-muted">
                  {p.preview ? <img src={p.preview} alt="" loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.03]" /> : null}
                </span>
                <span className="mt-2 block text-sm font-medium leading-snug text-foreground underline-offset-4 group-hover:underline">{p.name}</span>
                {p.price ? <span className="block text-sm text-muted-foreground">{p.price}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
