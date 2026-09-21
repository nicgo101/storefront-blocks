import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';
import { query } from '@nicgo101/storefront-commerce/api';
import { SearchProductsQuery } from '@nicgo101/storefront-commerce/queries';
import { ProductCard } from '@/components/commerce/product-card';
import { Button } from '@/components/ui/button';

export type ProductGridCollectionProps = {
  /** Collection slug in the shop (`/collection/<slug>`). Find it with the content tools; never guess. */
  slug: string;
  title?: string | null;
  text?: string;
  /** Number of products, default 8 (two rows of four). */
  take?: number;
  /** Link under the grid; default `/collection/<slug>`. `null` hides it. */
  moreHref?: string | null;
  moreLabel?: string;
};

async function getCollectionProducts(slug: string, take: number) {
  'use cache';
  cacheLife('hours');
  cacheTag(`collection-${slug}`);
  // Catch INSIDE the cached scope: a rejection here would abort the build even
  // though the caller catches. cacheLife takes the minimum, so seconds wins on
  // the error path and an outage is not cached for hours.
  try {
    const result = await query(SearchProductsQuery, { input: { take, skip: 0, collectionSlug: slug, groupByProduct: true } });
    return result.data.search.items;
  } catch (err) {
    console.error(`[product-grid-collection] fetch failed for '${slug}':`, err);
    cacheLife('seconds');
    return [];
  }
}

export default async function ProductGridCollection({ slug, title = null, text, take = 8, moreHref, moreLabel = 'Visa alla' }: ProductGridCollectionProps) {
  const products = await getCollectionProducts(slug, take);
  if (!products.length) return null;
  const href = moreHref === undefined ? `/collection/${slug}` : moreHref;
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-12 md:py-16">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ul className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ${title || text ? 'mt-8' : ''}`}>
          {/* Items are masked fragments (gql.tada): fields are read inside ProductCard, so the key is the position. */}
          {products.map((p, i) => <li key={i}><ProductCard product={p} index={i} /></li>)}
        </ul>
        {href ? (
          <div className="mt-8 text-center">
            <Button asChild variant="outline"><Link href={href}>{moreLabel}</Link></Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
