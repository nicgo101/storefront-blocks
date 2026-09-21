import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ImageTextItem = {
  title: string;
  text: string;
  image: { src: string; alt: string; width: number; height: number };
  cta?: { label: string; href: string };
};

export type ImageTextProps = {
  title?: string | null;
  /** One row per item; the image side alternates from row to row. */
  items: ImageTextItem[];
  /** Which side the FIRST image sits on. */
  start?: 'image-left' | 'image-right';
};

const DEFAULT_ITEMS: ImageTextItem[] = [
  { title: 'Vi vet vad som passar', text: 'Tjugo år med samma maskiner ger en känsla för vad som håller. Vi säljer bara det vi själva skulle välja.', image: { src: 'https://picsum.photos/seed/it-1/1000/750', alt: 'Verkstad', width: 1000, height: 750 } },
  { title: 'Snabbt hem till dig', text: 'Lagervaror skickas samma dag. Skrymmande gods körs med hemleverans, ända fram till dörren.', image: { src: 'https://picsum.photos/seed/it-2/1000/750', alt: 'Leverans', width: 1000, height: 750 } },
];

export default function ImageText({ title = null, items = DEFAULT_ITEMS, start = 'image-left' }: ImageTextProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="mb-12 text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        <div className="flex flex-col gap-16 md:gap-24">
          {items.map((item, i) => {
            const imageLeft = (start === 'image-left') === (i % 2 === 0);
            return (
              <div key={i} className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                <div className={cn('overflow-hidden rounded-lg', imageLeft ? 'md:order-1' : 'md:order-2')}>
                  <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(min-width: 768px) 40rem, 100vw" className="h-auto w-full object-cover" />
                </div>
                <div className={imageLeft ? 'md:order-2' : 'md:order-1'}>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{item.title}</h3>
                  <p className="mt-4 text-lg text-muted-foreground">{item.text}</p>
                  {item.cta ? <div className="mt-6"><Button asChild variant="outline"><Link href={item.cta.href}>{item.cta.label}</Link></Button></div> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
