import Image from 'next/image';
import Link from 'next/link';
import { Check, Truck, ShieldCheck, Headset, RotateCcw, Leaf, Star, Clock, Wrench, Package, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FEATURE_ICONS = { check: Check, truck: Truck, shield: ShieldCheck, headset: Headset, returns: RotateCcw, leaf: Leaf, star: Star, clock: Clock, wrench: Wrench, package: Package } satisfies Record<string, LucideIcon>;

export type FeatureHighlightProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  image: { src: string; alt: string; width: number; height: number };
  /** Three to five points beside the image. */
  features: { icon?: keyof typeof FEATURE_ICONS; title: string; text?: string }[];
  cta?: { label: string; href: string };
  imageSide?: 'left' | 'right';
};

export default function FeatureHighlight({ eyebrow, title, text, image, features, cta, imageSide = 'left' }: FeatureHighlightProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div className={imageSide === 'left' ? 'md:order-1' : 'md:order-2'}>
          <div className="overflow-hidden rounded-lg">
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 768px) 40rem, 100vw" className="h-auto w-full object-cover" />
          </div>
        </div>
        <div className={imageSide === 'left' ? 'md:order-2' : 'md:order-1'}>
          {eyebrow ? <p className="text-sm font-medium uppercase tracking-wide text-primary">{eyebrow}</p> : null}
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
          {text ? <p className="mt-4 text-lg text-muted-foreground">{text}</p> : null}
          <ul className="mt-8 space-y-5">
            {features.map((f, i) => {
              const Icon = (f.icon && FEATURE_ICONS[f.icon]) || Check;
              return (
                <li key={i} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-primary" aria-hidden="true"><Icon className="size-4" /></span>
                  <div>
                    <p className="font-semibold text-foreground">{f.title}</p>
                    {f.text ? <p className="mt-0.5 text-sm text-muted-foreground">{f.text}</p> : null}
                  </div>
                </li>
              );
            })}
          </ul>
          {cta ? <div className="mt-8"><Button asChild size="lg"><Link href={cta.href}>{cta.label}</Link></Button></div> : null}
        </div>
      </div>
    </section>
  );
}
