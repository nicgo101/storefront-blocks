import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export type StoreLocation = {
  name: string;
  address: string[];
  phone?: string;
  email?: string;
  /** Opening hours, one line each. */
  hours?: string[];
  /** A short note: "Stängt midsommarafton". */
  note?: string;
  /** Link to the map (Google Maps share link). */
  mapHref?: string;
};

export type StoreLocationsProps = {
  title?: string | null;
  text?: string;
  locations: StoreLocation[];
  /** Columns from `md`. */
  columns?: 2 | 3;
};

export function toTelHref(display: string): string {
  const digits = display.replace(/[^\d+]/g, '');
  return 'tel:' + (digits.startsWith('+') ? digits : digits.startsWith('0') ? '+46' + digits.slice(1) : digits);
}

const COLS: Record<number, string> = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' };

export default function StoreLocations({ title = 'Våra butiker', text, locations, columns = 3 }: StoreLocationsProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ul className={`grid gap-6 ${COLS[columns]} ${title || text ? 'mt-10' : ''}`}>
          {locations.map((l, i) => (
            <li key={i} className="rounded-lg border border-border bg-card p-6 text-card-foreground">
              <h3 className="text-xl font-semibold">{l.name}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><div><dt className="sr-only">Adress</dt><dd>{l.address.map((a, j) => <span key={j} className="block">{a}</span>)}</dd></div></div>
                {l.phone ? <div className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><div><dt className="sr-only">Telefon</dt><dd><a href={toTelHref(l.phone)} className="whitespace-nowrap underline-offset-4 hover:underline">{l.phone}</a></dd></div></div> : null}
                {l.email ? <div className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><div><dt className="sr-only">E-post</dt><dd><a href={`mailto:${l.email}`} className="underline-offset-4 hover:underline">{l.email}</a></dd></div></div> : null}
                {l.hours?.length ? <div className="flex gap-3"><Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><div><dt className="sr-only">Öppettider</dt><dd>{l.hours.map((h, j) => <span key={j} className="block">{h}</span>)}{l.note ? <span className="mt-1 block text-muted-foreground">{l.note}</span> : null}</dd></div></div> : null}
              </dl>
              {l.mapHref ? <a href={l.mapHref} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">Visa på karta<ExternalLink className="size-3.5" aria-hidden="true" /></a> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
