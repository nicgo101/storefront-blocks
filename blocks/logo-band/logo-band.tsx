import Image from 'next/image';
import Link from 'next/link';

export type LogoBandProps = {
  /** Small label above the logos, e.g. "Märken vi säljer". `null` hides it. */
  title?: string | null;
  /** 4 to 8 logos. `width`/`height` are the source pixels; logos are scaled to a 40 px row. */
  logos: { src: string; alt: string; width: number; height: number; href?: string }[];
  /** `gray`: grey until hover. `color`: always in colour. */
  tone?: 'gray' | 'color';
};

export default function LogoBand({ title = 'Märken vi säljer', logos, tone = 'gray' }: LogoBandProps) {
  const cls = tone === 'gray' ? 'h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0' : 'h-10 w-auto';
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-8">
        {title ? <p className="mb-6 text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">{title}</p> : null}
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((l, i) => {
            const img = <Image src={l.src} alt={l.alt} width={l.width} height={l.height} className={cls} />;
            return (
              <li key={i}>
                {l.href ? <Link href={l.href} aria-label={l.alt}>{img}</Link> : img}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
