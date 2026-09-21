import Image from 'next/image';
import Link from 'next/link';
import { getTopCollections } from '@nicgo101/storefront-commerce/cached';
import { Button } from '@/components/ui/button';

export type CollectionBannerProps = {
  /** Collection slug in the shop (`/collection/<slug>`). Find it with the content tools; never guess. */
  slug: string;
  /** Overrides the collection's own name. */
  title?: string;
  text?: string;
  /** Overrides the collection's featured image. `width`/`height` are the source pixels. */
  image?: { src: string; alt: string; width: number; height: number };
  buttonLabel?: string;
  /** `wide`: full-width band, text over the image. `card`: image left, text right. */
  layout?: 'wide' | 'card';
};

async function getCollection(slug: string) {
  try {
    const all = await getTopCollections();
    return all.find((c) => c.slug === slug) ?? null;
  } catch (err) {
    console.error(`[collection-banner] collections failed for '${slug}':`, err);
    return null;
  }
}

export default async function CollectionBanner({ slug, title, text, image, buttonLabel = 'Se hela sortimentet', layout = 'wide' }: CollectionBannerProps) {
  const c = await getCollection(slug);
  const heading = title ?? c?.name;
  const img = image ?? (c?.featuredAsset?.preview ? { src: c.featuredAsset.preview, alt: c.name, width: 1600, height: 700 } : null);
  if (!heading) return null;
  const href = `/collection/${slug}`;

  if (layout === 'card') {
    return (
      <section className="bg-background">
        <div className="mx-auto max-w-[80rem] px-6 py-12 md:py-16">
          <div className="grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-2">
            {img ? <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 40rem, 100vw" className="h-64 w-full object-cover md:h-full" /> : <div className="h-64 bg-muted md:h-full" />}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <h2 className="text-3xl font-bold tracking-tight text-card-foreground">{heading}</h2>
              {text ? <p className="mt-3 text-muted-foreground">{text}</p> : null}
              <div className="mt-6"><Button asChild><Link href={href}>{buttonLabel}</Link></Button></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="relative isolate overflow-hidden bg-muted">
      {img ? <Image src={img.src} alt="" width={img.width} height={img.height} sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover" /> : null}
      <div className="absolute inset-0 -z-10 bg-background/60" />
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:py-28">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground md:text-5xl">{heading}</h2>
        {text ? <p className="mt-3 max-w-xl text-lg text-muted-foreground">{text}</p> : null}
        <div className="mt-8"><Button asChild size="lg"><Link href={href}>{buttonLabel}</Link></Button></div>
      </div>
    </section>
  );
}
