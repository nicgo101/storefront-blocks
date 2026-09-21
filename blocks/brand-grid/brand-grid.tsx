import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';
import { query } from '@nicgo101/storefront-commerce/api';
import { SearchProductsQuery } from '@nicgo101/storefront-commerce/queries';

export type BrandGridProps = {
  title?: string | null;
  text?: string;
  /** The facet's code in the shop (`brand` on the storefronts); matched against code or name, case-insensitive. */
  facet?: string;
  /** Show only these values, in this order (by name). Omit for all, sorted by product count. */
  names?: string[];
  /** Cap when `names` is omitted, default 12. */
  take?: number;
  /** Link per value; `{id}` and `{name}` are replaced. Default: the storefronts' search page filtered on the facet value. */
  hrefTemplate?: string;
  /** Show the product count under the name. */
  showCount?: boolean;
  columns?: 3 | 4 | 6;
};

type FacetHit = { id: string; name: string; count: number };

async function getFacetValues(facet: string): Promise<FacetHit[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('facets');
  try {
    // An unfiltered search returns every facet value with its product count.
    const result = await query(SearchProductsQuery, { input: { take: 1, skip: 0, groupByProduct: true } });
    const want = facet.toLowerCase();
    return result.data.search.facetValues
      .filter((f) => f.facetValue.facet.code.toLowerCase() === want || f.facetValue.facet.name.toLowerCase() === want)
      .map((f) => ({ id: String(f.facetValue.id), name: f.facetValue.name, count: f.count }));
  } catch (err) {
    console.error(`[brand-grid] facet search failed for '${facet}':`, err);
    cacheLife('seconds');
    return [];
  }
}

const COLS: Record<number, string> = { 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 6: 'md:grid-cols-6' };

export default async function BrandGrid({ title = 'Märken', text, facet = 'brand', names, take = 12, hrefTemplate = '/search?facets={id}', showCount = false, columns = 4 }: BrandGridProps) {
  const all = await getFacetValues(facet);
  const values = names
    ? names.map((n) => all.find((v) => v.name.toLowerCase() === n.toLowerCase())).filter((v): v is FacetHit => Boolean(v))
    : [...all].sort((a, b) => b.count - a.count).slice(0, take);
  if (!values.length) return null;
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-12 md:py-16">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ul className={`grid grid-cols-2 gap-3 ${COLS[columns]} ${title || text ? 'mt-8' : ''}`}>
          {values.map((v) => (
            <li key={v.id}>
              <Link href={hrefTemplate.replace('{id}', encodeURIComponent(v.id)).replace('{name}', encodeURIComponent(v.name))} className="flex h-full flex-col items-center justify-center rounded-lg border border-border bg-card px-4 py-6 text-center transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="font-semibold text-card-foreground">{v.name}</span>
                {showCount ? <span className="mt-1 text-xs text-muted-foreground">{v.count} produkter</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
