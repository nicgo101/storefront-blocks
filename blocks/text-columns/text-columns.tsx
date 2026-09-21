import Link from 'next/link';

export type TextColumn = {
  title: string;
  /** One paragraph per array item. */
  paragraphs: string[];
  link?: { label: string; href: string };
};

export type TextColumnsProps = {
  title?: string | null;
  text?: string;
  /** Two or three columns; they stack on phones. */
  columns: TextColumn[];
  /** `plain`: on the page background. `band`: muted band across the page. */
  variant?: 'plain' | 'band';
};

const COLS: Record<number, string> = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

export default function TextColumns({ title = null, text, columns, variant = 'plain' }: TextColumnsProps) {
  const cols = COLS[Math.min(4, Math.max(1, columns.length))];
  return (
    <section className={variant === 'band' ? 'bg-muted' : 'bg-background'}>
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <div className={`grid gap-10 ${cols} ${title || text ? 'mt-10' : ''}`}>
          {columns.map((c, i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold text-foreground">{c.title}</h3>
              {c.paragraphs.map((p, j) => <p key={j} className="mt-3 text-muted-foreground">{p}</p>)}
              {c.link ? <p className="mt-4"><Link href={c.link.href} className="font-medium text-primary underline-offset-4 hover:underline">{c.link.label}</Link></p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
