/**
 * Showcase stand-in for the storefronts' `@/components/commerce/product-card`.
 * Same exported name and prop shape (a masked `ProductCardFragment` item as
 * returned by `search.items`). The real sites have their own; a shop block
 * lists this path under `uses.site` and the agent verifies it exists before
 * copying.
 */
import Link from 'next/link';
import type { FragmentOf } from '@nicgo101/storefront-commerce/graphql';
import { readFragment } from '@nicgo101/storefront-commerce/graphql';
import { ProductCardFragment } from '@nicgo101/storefront-commerce/fragments';

interface ProductCardProps {
  product: FragmentOf<typeof ProductCardFragment>;
  index?: number;
}

function price(p: { __typename: 'PriceRange'; min: number; max: number } | { __typename: 'SinglePrice'; value: number }) {
  const fmt = (n: number) => `${Math.round(n / 100)} kr`;
  return p.__typename === 'PriceRange' && p.min !== p.max ? `från ${fmt(p.min)}` : fmt(p.__typename === 'PriceRange' ? p.min : p.value);
}

export function ProductCard({ product: productProp }: ProductCardProps) {
  const product = readFragment(ProductCardFragment, productProp);
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
      <Link href={`/produkt/${product.slug}`} className="block aspect-square bg-muted">
        {product.productAsset?.preview ? (
          <img src={product.productAsset.preview} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link href={`/produkt/${product.slug}`} className="font-medium leading-snug underline-offset-4 hover:underline">{product.productName}</Link>
        <span className="mt-auto text-sm text-muted-foreground">{price(product.priceWithTax)}</span>
      </div>
    </article>
  );
}
