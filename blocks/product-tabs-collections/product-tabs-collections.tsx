import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';
import { query } from '@nicgo101/storefront-commerce/api';
import { SearchProductsQuery } from '@nicgo101/storefront-commerce/queries';
import { ProductCard } from '@/components/commerce/product-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export type ProductTab = {
  /** Tab label, e.g. "Nyheter". */
  label: string;
  /** Collection slug in the shop. Find it with the content tools; never guess. */
  slug: string;
};

export type ProductTabsCollectionsProps = {
  title?: string | null;
  text?: string;
  /** Two to five tabs. Tabs whose collection returns nothing are dropped. */
  tabs: ProductTab[];
  /** Products per tab, default 8. */
  take?: number;
  /** "Visa alla" under each grid, linking to the collection. */
  moreLabel?: string | null;
};

async function getCollectionProducts(slug: string, take: number) {
  'use cache';
  cacheLife('hours');
  cacheTag(`collection-${slug}`);
  try {
    const result = await query(SearchProductsQuery, { input: { take, skip: 0, collectionSlug: slug, groupByProduct: true } });
    return result.data.search.items;
  } catch (err) {
    console.error(`[product-tabs-collections] fetch failed for '${slug}':`, err);
    cacheLife('seconds');
    return [];
  }
}

/**
 * Server component: the grids are fetched and rendered here; only the tab switching is
 * client-side (ui/tabs). Rendered children pass into the client Tabs as RSC payload.
 */
export default async function ProductTabsCollections({ title = null, text, tabs, take = 8, moreLabel = 'Visa alla' }: ProductTabsCollectionsProps) {
  const loaded = await Promise.all(tabs.map(async (t) => ({ ...t, products: await getCollectionProducts(t.slug, take) })));
  const filled = loaded.filter((t) => t.products.length);
  if (!filled.length) return null;
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-12 md:py-16">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <Tabs defaultValue={filled[0].slug} className={title || text ? 'mt-8' : ''}>
          <TabsList aria-label={title ?? 'Produkter'}>
            {filled.map((t) => <TabsTrigger key={t.slug} value={t.slug}>{t.label}</TabsTrigger>)}
          </TabsList>
          {filled.map((t) => (
            <TabsContent key={t.slug} value={t.slug} className="mt-6">
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {t.products.map((p, i) => <li key={i}><ProductCard product={p} /></li>)}
              </ul>
              {moreLabel ? (
                <div className="mt-8 text-center">
                  <Button asChild variant="outline"><Link href={`/collection/${t.slug}`}>{moreLabel}</Link></Button>
                </div>
              ) : null}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
