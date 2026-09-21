import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wrench, Truck, Headset, BookOpen, Tag, Leaf, Star, Package, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const CTA_ICONS = { wrench: Wrench, truck: Truck, headset: Headset, book: BookOpen, tag: Tag, leaf: Leaf, star: Star, package: Package } satisfies Record<string, LucideIcon>;

export type CtaCard = {
  title: string;
  text: string;
  href: string;
  /** Either an icon name or an image; the image wins when both are set. */
  icon?: keyof typeof CTA_ICONS;
  image?: { src: string; alt: string; width: number; height: number };
  linkLabel?: string;
};

export type CtaCardsProps = {
  title?: string | null;
  text?: string;
  /** Two to four cards. */
  cards: CtaCard[];
};

const COLS: Record<number, string> = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

export default function CtaCards({ title = null, text, cards }: CtaCardsProps) {
  const cols = COLS[Math.min(4, Math.max(1, cards.length))];
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ul className={`grid gap-6 ${cols} ${title || text ? 'mt-10' : ''}`}>
          {cards.map((c, i) => {
            const Icon = c.icon ? CTA_ICONS[c.icon] : null;
            return (
              <li key={i}>
                <Link href={c.href} className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Card className="h-full overflow-hidden transition group-hover:border-primary">
                    {c.image ? <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 768px) 25rem, 100vw" className="aspect-[3/2] w-full object-cover" /> : null}
                    <CardContent className="flex h-full flex-col gap-3 p-6">
                      {!c.image && Icon ? <span className="flex size-10 items-center justify-center rounded-full bg-muted text-primary" aria-hidden="true"><Icon className="size-5" /></span> : null}
                      <h3 className="text-lg font-semibold text-card-foreground">{c.title}</h3>
                      <p className="flex-1 text-sm text-muted-foreground">{c.text}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">{c.linkLabel ?? 'Läs mer'}<ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" /></span>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
