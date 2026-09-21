import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type HeroImageProps = {
  /** Short headline, one line on desktop. */
  title: string;
  /** One or two sentences under the headline. */
  text?: string;
  /** Hero image; width/height are the source pixel size (next/image needs them). */
  image: { src: string; alt: string; width: number; height: number };
  /** Main call to action. */
  primary: { label: string; href: string };
  /** Optional secondary link, rendered as an outline button. */
  secondary?: { label: string; href: string };
  /** `split`: text left, image right (stacked on phones). `centered`: text over a full-width image. */
  layout?: 'split' | 'centered';
};

export default function HeroImage({
  title = 'Allt för din trädgård, levererat hem',
  text = 'Verktyg, jord och växter från odlare vi känner. Fri frakt över 499 kr.',
  image,
  primary = { label: 'Handla nu', href: '/collection' },
  secondary,
  layout = 'split',
}: HeroImageProps) {
  if (layout === 'centered') {
    return (
      <section className="relative isolate overflow-hidden bg-muted">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-background/70" />
        <div className="mx-auto flex max-w-[80rem] flex-col items-center px-6 py-24 text-center md:py-32">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">{title}</h1>
          {text ? <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{text}</p> : null}
          <Actions primary={primary} secondary={secondary} className="mt-8 justify-center" />
        </div>
      </section>
    );
  }
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h1>
          {text ? <p className="mt-4 text-lg text-muted-foreground">{text}</p> : null}
          <Actions primary={primary} secondary={secondary} className="mt-8" />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Actions({ primary, secondary, className }: Pick<HeroImageProps, 'primary' | 'secondary'> & { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <Button asChild size="lg"><Link href={primary.href}>{primary.label}</Link></Button>
      {secondary ? <Button asChild size="lg" variant="outline"><Link href={secondary.href}>{secondary.label}</Link></Button> : null}
    </div>
  );
}
