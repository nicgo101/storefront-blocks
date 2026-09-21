import { cacheLife, cacheTag } from 'next/cache';
import { query } from '@nicgo101/storefront-commerce/api';
import { SearchProductsQuery } from '@nicgo101/storefront-commerce/queries';
import { ProductCarousel } from '@/components/commerce/product-carousel';

export type ProductCarouselCollectionProps = {
  /** Collection slug in the shop (`/collection/<slug>`). Find it with the content tools; never guess. */
  slug: string;
  /** Heading the site's carousel renders; required by the carousel. */
  title: string;
  /** Number of products, default 12. */
  take?: number;
  /** Passed through to the site's carousel when it supports it. */
  variant?: 'default' | 'inverted';
};

async function getCollectionProducts(slug: string, take: number) {
  'use cache';
  cacheLife('hours');
  cacheTag(`collection-${slug}`);
  try {
    const result = await query(SearchProductsQuery, { input: { take, skip: 0, collectionSlug: slug, groupByProduct: true } });
    return result.data.search.items;
  } catch (err) {
    console.error(`[product-carousel-collection] fetch failed for '${slug}':`, err);
    cacheLife('seconds');
    return [];
  }
}

export default async function ProductCarouselCollection({ slug, title, take = 12, variant = 'default' }: ProductCarouselCollectionProps) {
  const products = await getCollectionProducts(slug, take);
  if (!products.length) return null;
  return <ProductCarousel title={title} products={products} variant={variant} />;
}
