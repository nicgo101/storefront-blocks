import Image from 'next/image';
import Link from 'next/link';
import { getTopCollections } from '@nicgo101/storefront-commerce/cached';
import { Button } from '@/components/ui/button';
import CampaignCountdown from './campaign-countdown';

export type CampaignHeroProps = {
  /** The campaign collection's slug in the shop (the storefronts keep it in `src/lib/menu-config.ts`). */
  slug: string;
  /** Small label above the heading, e.g. "Kampanj". */
  eyebrow?: string;
  /** Overrides the collection name. */
  title?: string;
  text?: string;
  /** Overrides the collection's featured image. */
  image?: { src: string; alt: string; width: number; height: number };
  buttonLabel?: string;
  /** ISO date-time; shows a countdown until then and hides it afterwards. */
  endsAt?: string;
  /** `dark`: dark wash, light text. `light`: light wash, normal text. */
  tone?: 'dark' | 'light';
};

async function getCollection(slug: string) {
  try {
    return (await getTopCollections()).find((c) => c.slug === slug) ?? null;
  } catch (err) {
    console.error(`[campaign-hero] collections failed for '${slug}':`, err);
    return null;
  }
}

export default async function CampaignHero({ slug, eyebrow = 'Kampanj', title, text, image, buttonLabel = 'Se kampanjen', endsAt, tone = 'dark' }: CampaignHeroProps) {
  const c = await getCollection(slug);
  const heading = title ?? c?.name;
  if (!heading) return null;
  const img = image ?? (c?.featuredAsset?.preview ? { src: c.featuredAsset.preview, alt: '', width: 1600, height: 800 } : null);
  const dark = tone === 'dark';
  return (
    <section className={`relative isolate overflow-hidden ${dark ? 'bg-foreground text-background' : 'bg-muted text-foreground'}`}>
      {img ? <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover" /> : null}
      <div className={`absolute inset-0 -z-10 ${dark ? 'bg-foreground/60' : 'bg-background/60'}`} />
      <div className="mx-auto max-w-[80rem] px-6 py-20 md:py-28">
        {eyebrow ? <p className={`text-sm font-medium uppercase tracking-wide ${dark ? 'text-background/80' : 'text-primary'}`}>{eyebrow}</p> : null}
        <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">{heading}</h1>
        {text ? <p className={`mt-4 max-w-xl text-lg ${dark ? 'text-background/85' : 'text-muted-foreground'}`}>{text}</p> : null}
        {endsAt ? <div className={dark ? '[&_*]:text-background [&_span]:text-background/80' : ''}><CampaignCountdown endsAt={endsAt} /></div> : null}
        <div className="mt-8">
          <Button asChild size="lg" variant={dark ? 'secondary' : 'default'}><Link href={`/collection/${slug}`}>{buttonLabel}</Link></Button>
        </div>
      </div>
    </section>
  );
}
