export type StatsRowProps = {
  title?: string;
  /** Two to four figures. `value` is shown as written ("12 000+", "4,8 av 5"). */
  stats: { value: string; label: string }[];
  /** `plain`: on the page background. `card`: each figure in a card. */
  variant?: 'plain' | 'card';
};

const DEFAULT_STATS: StatsRowProps['stats'] = [
  { value: '12 000+', label: 'nöjda kunder' },
  { value: '4,8 av 5', label: 'i snittbetyg' },
  { value: '1 till 3', label: 'dagars leverans' },
  { value: '30', label: 'dagars öppet köp' },
];

// Tailwind only emits classes it can see, so the column count maps to literal class names.
const COLS: Record<number, string> = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

export default function StatsRow({ title, stats = DEFAULT_STATS, variant = 'plain' }: StatsRowProps) {
  const cols = COLS[Math.min(4, Math.max(2, stats.length))];
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-12 md:py-16">
        {title ? <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2> : null}
        <dl className={`grid grid-cols-2 gap-6 ${cols}`}>
          {stats.map((s, i) => (
            <div key={i} className={variant === 'card' ? 'rounded-lg border border-border bg-card p-6 text-center' : 'text-center'}>
              <dd className="text-4xl font-bold tabular-nums tracking-tight text-foreground md:text-5xl">{s.value}</dd>
              <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
