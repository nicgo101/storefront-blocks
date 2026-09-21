import Image from 'next/image';
import Link from 'next/link';
import { getTopCollections } from '@nicgo101/storefront-commerce/cached';

export type CategoryTilesProps = {
  title?: string | null;
  text?: string;
  /** Which collections, in this order. Omit for every top-level collection the shop returns. */
  slugs?: string[];
  /** Columns from `md`; phones show 2. */
  columns?: 2 | 3 | 4;
  /** `overlay`: name over the image. `below`: name under the image. */
  style?: 'overlay' | 'below';
};

const COLS: Record<number, string> = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

async function getCollections(slugs?: string[]) {
  try {
    const all = await getTopCollections();
    if (!slugs) return all;
    return slugs.map((s) => all.find((c) => c.slug === s)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  } catch (err) {
    console.error('[category-tiles] collections failed:', err);
    return [];
  }
}

export default async function CategoryTiles({ title = null, text, slugs, columns = 3, style = 'overlay' }: CategoryTilesProps) {
  const collections = await getCollections(slugs);
  if (!collections.length) return null;
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-12 md:py-16">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ul className={`grid grid-cols-2 gap-4 ${COLS[columns]} ${title || text ? 'mt-8' : ''}`}>
          {collections.map((c) => (
            <li key={c.id}>
              <Link href={`/collection/${c.slug}`} className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  {c.featuredAsset?.preview ? (
                    <Image src={c.featuredAsset.preview} alt="" width={800} height={600} sizes="(min-width: 768px) 25rem, 50vw" className="h-full w-full object-cover transition group-hover:scale-[1.03]" />
                  ) : null}
                  {style === 'overlay' ? (
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 text-lg font-semibold text-foreground">{c.name}</span>
                  ) : null}
                </div>
                {style === 'below' ? <span className="mt-2 block font-semibold text-foreground">{c.name}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
