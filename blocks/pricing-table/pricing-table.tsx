import Link from 'next/link';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type PricingPlan = {
  name: string;
  /** Shown as written: "499 kr", "Från 1 200 kr", "Offert". */
  price: string;
  /** Under the price: "per månad", "engångskostnad". */
  period?: string;
  text?: string;
  features: string[];
  cta: { label: string; href: string };
  /** Lifted card with a badge; at most one per table. */
  highlighted?: boolean;
  badge?: string;
};

export type PricingTableProps = {
  title?: string | null;
  text?: string;
  plans: PricingPlan[];
};

const COLS: Record<number, string> = { 1: 'md:grid-cols-1 md:max-w-md', 2: 'md:grid-cols-2 md:max-w-3xl', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

export default function PricingTable({ title = 'Priser', text, plans }: PricingTableProps) {
  const cols = COLS[Math.min(4, Math.max(1, plans.length))];
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">{text}</p> : null}
        <div className={cn('mx-auto mt-10 grid gap-6', cols)}>
          {plans.map((p, i) => (
            <Card key={i} className={cn('flex flex-col', p.highlighted && 'border-primary shadow-lg ring-1 ring-primary')}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  {p.badge ? <Badge variant={p.highlighted ? 'default' : 'secondary'}>{p.badge}</Badge> : null}
                </div>
                <p className="mt-2">
                  <span className="text-3xl font-bold tabular-nums text-foreground">{p.price}</span>
                  {p.period ? <span className="ml-1 text-sm text-muted-foreground">{p.period}</span> : null}
                </p>
                {p.text ? <p className="text-sm text-muted-foreground">{p.text}</p> : null}
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={p.highlighted ? 'default' : 'outline'}>
                  <Link href={p.cta.href}>{p.cta.label}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
