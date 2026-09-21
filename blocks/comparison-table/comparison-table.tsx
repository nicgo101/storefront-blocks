import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ComparisonColumn = {
  name: string;
  /** Under the name: "499 kr/mån", "Från 1 200 kr". */
  price?: string;
  cta?: { label: string; href: string };
  /** Highlighted column, at most one. */
  highlighted?: boolean;
};

export type ComparisonRow = {
  label: string;
  /** One value per column: `true`/`false` draws a check or a cross, a string is shown as written. */
  values: (boolean | string)[];
};

export type ComparisonTableProps = {
  title?: string | null;
  text?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  /** Header for the first (label) column, e.g. "Ingår". */
  rowHeader?: string;
};

export default function ComparisonTable({ title = null, text, columns, rows, rowHeader = '' }: ComparisonTableProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">{text}</p> : null}
        <div className={cn('overflow-x-auto rounded-lg border border-border', (title || text) && 'mt-10')}>
          <table className="w-full min-w-[40rem] border-collapse text-sm">
            <thead>
              <tr className="bg-muted/60">
                <th scope="col" className="p-4 text-left font-medium text-muted-foreground">{rowHeader}</th>
                {columns.map((c, i) => (
                  <th key={i} scope="col" className={cn('p-4 text-center align-top', c.highlighted && 'bg-primary/10')}>
                    <span className="block text-base font-semibold text-foreground">{c.name}</span>
                    {c.price ? <span className="mt-1 block text-sm font-normal tabular-nums text-muted-foreground">{c.price}</span> : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-t border-border">
                  <th scope="row" className="p-4 text-left font-medium text-foreground">{r.label}</th>
                  {columns.map((c, ci) => {
                    const v = r.values[ci];
                    return (
                      <td key={ci} className={cn('p-4 text-center text-foreground', c.highlighted && 'bg-primary/10')}>
                        {v === true ? <Check className="mx-auto size-5 text-primary" aria-label="Ja" />
                          : v === false ? <X className="mx-auto size-5 text-muted-foreground/60" aria-label="Nej" />
                          : <span>{v ?? ''}</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {columns.some((c) => c.cta) ? (
                <tr className="border-t border-border">
                  <td className="p-4" />
                  {columns.map((c, i) => (
                    <td key={i} className={cn('p-4 text-center', c.highlighted && 'bg-primary/10')}>
                      {c.cta ? <Button asChild size="sm" variant={c.highlighted ? 'default' : 'outline'}><Link href={c.cta.href}>{c.cta.label}</Link></Button> : null}
                    </td>
                  ))}
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
