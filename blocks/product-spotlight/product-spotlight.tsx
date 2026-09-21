import { cacheLife, cacheTag } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { query } from '@nicgo101/storefront-commerce/api';
import { GetProductBySlugQuery } from '@nicgo101/storefront-commerce/queries';
import { Button } from '@/components/ui/button';

export type ProductSpotlightProps = {
  /** Product slug in the shop (`/produkt/<slug>`). Find it with the content tools; never guess. */
  slug: string;
  /** Small label above the name, e.g. "Månadens produkt". */
  eyebrow?: string;
  /** Overrides the product name as the heading. */
  title?: string;
  /** Selling text written for this placement (the product page has the description). */
  text?: string;
  /** Overrides the product's featured image. */
  image?: { src: string; alt: string; width: number; height: number };
  buttonLabel?: string;
  /** Which side the image sits on from `md`. */
  imageSide?: 'left' | 'right';
};

async function getProduct(slug: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(`product-${slug}`);
  try {
    const result = await query(GetProductBySlugQuery, { slug });
    return result.data.product;
  } catch (err) {
    console.error(`[product-spotlight] fetch failed for '${slug}':`, err);
    cacheLife('seconds');
    return null;
  }
}

function formatPrice(minor: number, currency: string) {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency, maximumFractionDigits: 0 }).format(minor / 100);
}

export default async function ProductSpotlight({ slug, eyebrow, title, text, image, buttonLabel = 'Till produkten', imageSide = 'left' }: ProductSpotlightProps) {
  const product = await getProduct(slug);
  if (!product) return null;
  const prices = product.variants.map((v) => v.priceWithTax);
  const min = Math.min(...prices), max = Math.max(...prices);
  const currency = product.variants[0]?.currencyCode ?? 'SEK';
  const price = prices.length ? (min === max ? formatPrice(min, currency) : `från ${formatPrice(min, currency)}`) : null;
  const img = image ?? (product.featuredAsset?.preview ? { src: product.featuredAsset.preview, alt: product.name, width: 1200, height: 900 } : null);
  const href = `/produkt/${product.slug}`;
  return (
    <section className="bg-muted">
      <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className={imageSide === 'left' ? 'md:order-1' : 'md:order-2'}>
          <Link href={href} className="block overflow-hidden rounded-lg bg-background">
            {img ? <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 40rem, 100vw" className="h-auto w-full object-cover" /> : <div className="aspect-[4/3]" />}
          </Link>
        </div>
        <div className={imageSide === 'left' ? 'md:order-2' : 'md:order-1'}>
          {eyebrow ? <p className="text-sm font-medium uppercase tracking-wide text-primary">{eyebrow}</p> : null}
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title ?? product.name}</h2>
          {price ? <p className="mt-3 text-xl tabular-nums text-foreground">{price}</p> : null}
          {text ? <p className="mt-4 text-lg text-muted-foreground">{text}</p> : null}
          <div className="mt-8"><Button asChild size="lg"><Link href={href}>{buttonLabel}</Link></Button></div>
        </div>
      </div>
    </section>
  );
}
