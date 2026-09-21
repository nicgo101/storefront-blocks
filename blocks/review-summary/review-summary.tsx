import Link from 'next/link';
import { Star } from 'lucide-react';

export type ReviewSummaryProps = {
  /** Average rating, e.g. 4.8. */
  rating: number;
  /** Number of reviews behind the average. */
  count: number;
  /** Scale, default 5. */
  max?: number;
  /** Where the number comes from: "på Trustpilot", "från våra kunder". */
  source?: string;
  /** Link to the reviews page or the review platform. */
  href?: string;
  linkLabel?: string;
  /** `band`: centered strip across the page. `inline`: compact, left-aligned, for placing under a hero. */
  variant?: 'band' | 'inline';
};

export function formatRating(rating: number): string {
  return new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(rating);
}

export default function ReviewSummary({ rating, count, max = 5, source, href, linkLabel = 'Läs omdömena', variant = 'band' }: ReviewSummaryProps) {
  const r = Math.min(max, Math.max(0, rating));
  const label = `${formatRating(r)} av ${max}`;
  const stars = (
    <span className="flex gap-0.5 text-primary" role="img" aria-label={`${label} stjärnor`}>
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, r - i));
        return (
          <span key={i} className="relative size-5" aria-hidden="true">
            <Star className="absolute inset-0 size-5 text-muted-foreground/40" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}><Star className="size-5 fill-current" /></span>
          </span>
        );
      })}
    </span>
  );
  const external = href ? /^https?:\/\//.test(href) : false;
  const link = href ? (external
    ? <a href={href} target="_blank" rel="noopener" className="font-medium text-primary underline-offset-4 hover:underline">{linkLabel}</a>
    : <Link href={href} className="font-medium text-primary underline-offset-4 hover:underline">{linkLabel}</Link>) : null;
  const counted = new Intl.NumberFormat('sv-SE').format(count);

  if (variant === 'inline') {
    return (
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground">
        {stars}
        <span><strong className="tabular-nums">{formatRating(r)}</strong> av {max}{source ? ` ${source}` : ''}, {counted} omdömen</span>
        {link}
      </p>
    );
  }
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-2 px-6 py-8 text-center">
        {stars}
        <p className="text-lg text-foreground"><strong className="tabular-nums">{formatRating(r)}</strong> av {max}{source ? ` ${source}` : ''}</p>
        <p className="text-sm text-muted-foreground">Baserat på {counted} omdömen{link ? <> · {link}</> : null}</p>
      </div>
    </section>
  );
}
