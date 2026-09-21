import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export type PromoTile = {
  eyebrow?: string;
  title: string;
  text?: string;
  href: string;
  linkLabel?: string;
  image: { src: string; alt: string; width: number; height: number };
  /** `dark`: dark wash, light text. `light`: light wash, normal text. */
  tone?: 'dark' | 'light';
};

export type PromoTilesProps = {
  /** Two or three tiles. */
  tiles: PromoTile[];
  /** `wide`: the first tile spans two columns when there are three. */
  layout?: 'even' | 'wide';
  /** Tile height. */
  height?: 'short' | 'tall';
};

export default function PromoTiles({ tiles, layout = 'even', height = 'short' }: PromoTilesProps) {
  const three = tiles.length >= 3;
  return (
    <section className="bg-background">
      <ul className={`mx-auto grid max-w-[80rem] gap-4 px-6 py-8 md:py-12 ${three ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {tiles.slice(0, 3).map((t, i) => {
          const dark = (t.tone ?? 'dark') === 'dark';
          const span = layout === 'wide' && three && i === 0 ? 'md:col-span-2' : '';
          return (
            <li key={i} className={span}>
              <Link href={t.href} className={`group relative isolate flex overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${height === 'tall' ? 'min-h-[24rem]' : 'min-h-[16rem]'} ${dark ? 'text-background' : 'text-foreground'}`}>
                <Image src={t.image.src} alt={t.image.alt} width={t.image.width} height={t.image.height} sizes="(min-width: 768px) 40rem, 100vw" className="absolute inset-0 -z-10 h-full w-full object-cover transition group-hover:scale-[1.03]" />
                <span className={`absolute inset-0 -z-10 ${dark ? 'bg-foreground/55' : 'bg-background/60'}`} aria-hidden="true" />
                <span className="flex flex-1 flex-col justify-end p-6 md:p-8">
                  {t.eyebrow ? <span className={`text-xs font-medium uppercase tracking-wide ${dark ? 'text-background/80' : 'text-primary'}`}>{t.eyebrow}</span> : null}
                  <span className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{t.title}</span>
                  {t.text ? <span className={`mt-2 max-w-md ${dark ? 'text-background/85' : 'text-muted-foreground'}`}>{t.text}</span> : null}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">{t.linkLabel ?? 'Visa'}<ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" /></span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
