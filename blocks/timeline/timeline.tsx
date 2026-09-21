import Image from 'next/image';

export type TimelineItem = {
  /** The marker: a year, a date or a step ("2004", "Vecka 1"). */
  label: string;
  title: string;
  text?: string;
  image?: { src: string; alt: string; width: number; height: number };
};

export type TimelineProps = {
  title?: string | null;
  text?: string;
  items: TimelineItem[];
  /** `line`: one vertical rail with the marker on the rail. `alternate`: entries zigzag left and right of the rail from `md`. */
  layout?: 'line' | 'alternate';
};

export default function Timeline({ title = null, text, items, layout = 'line' }: TimelineProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ol className={`relative ${title || text ? 'mt-12' : ''}`}>
          <span className={`absolute top-0 bottom-0 w-px bg-border ${layout === 'alternate' ? 'left-4 md:left-1/2' : 'left-4'}`} aria-hidden="true" />
          {items.map((item, i) => {
            const right = layout === 'alternate' && i % 2 === 1;
            return (
              <li key={i} className={`relative pb-12 pl-12 last:pb-0 ${layout === 'alternate' ? (right ? 'md:pl-[calc(50%+2.5rem)]' : 'md:w-1/2 md:pl-0 md:pr-10 md:text-right') : ''}`}>
                <span className={`absolute top-1 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background ${layout === 'alternate' ? 'left-4 md:left-1/2' : 'left-4'}`} aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-primary" />
                </span>
                <p className="text-sm font-medium uppercase tracking-wide text-primary">{item.label}</p>
                <h3 className="mt-1 text-xl font-semibold text-foreground">{item.title}</h3>
                {item.text ? <p className="mt-2 text-muted-foreground">{item.text}</p> : null}
                {item.image ? <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(min-width: 768px) 24rem, 100vw" className="mt-4 h-auto w-full max-w-sm rounded-lg object-cover" /> : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
