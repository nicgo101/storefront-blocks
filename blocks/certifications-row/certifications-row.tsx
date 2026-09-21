import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';

export type Certification = {
  title: string;
  /** One sentence: what it means for the customer. */
  text: string;
  /** The mark; omit for a check badge. */
  image?: { src: string; alt: string; width: number; height: number };
  /** Link to the issuer or the certificate. */
  href?: string;
};

export type CertificationsRowProps = {
  title?: string | null;
  text?: string;
  /** Three to five items. */
  items: Certification[];
  variant?: 'plain' | 'band';
};

// Literal class names so Tailwind emits them.
const COLS: Record<number, string> = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' };

export default function CertificationsRow({ title = 'Certifieringar och märkningar', text, items, variant = 'band' }: CertificationsRowProps) {
  return (
    <section className={variant === 'band' ? 'bg-muted' : 'bg-background'}>
      <div className="mx-auto max-w-[80rem] px-6 py-12 md:py-16">
        {title ? <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ul className={`grid gap-8 sm:grid-cols-2 ${COLS[Math.min(4, Math.max(2, items.length))]} ${title || text ? 'mt-8' : ''}`}>
          {items.map((c, i) => {
            const mark = c.image
              ? <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} className="h-14 w-auto object-contain" />
              : <span className="flex size-14 items-center justify-center rounded-full bg-background text-primary" aria-hidden="true"><BadgeCheck className="size-7" /></span>;
            return (
              <li key={i} className="flex items-start gap-4">
                <span className="shrink-0">{c.href ? <a href={c.href} target="_blank" rel="noopener" aria-label={c.title}>{mark}</a> : mark}</span>
                <div>
                  <p className="font-semibold text-foreground">{c.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
