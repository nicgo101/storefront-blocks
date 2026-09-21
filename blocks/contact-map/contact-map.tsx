import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export type ContactMapProps = {
  title?: string;
  text?: string;
  /** Street, postcode and town as separate lines. */
  address: string[];
  /** Shown as written; the `tel:` link strips spaces and turns a leading 0 into +46. */
  phone?: string;
  email?: string;
  /** Opening hours, one line each ("Mån till fre 8 till 17"). */
  hours?: string[];
  /** A Google Maps "Bädda in en karta" URL (https://www.google.com/maps/embed?pb=…). Omit to render the info without a map. */
  mapEmbedUrl?: string;
};

export function toTelHref(display: string): string {
  const digits = display.replace(/[^\d+]/g, '');
  return 'tel:' + (digits.startsWith('+') ? digits : digits.startsWith('0') ? '+46' + digits.slice(1) : digits);
}

export default function ContactMap({
  title = 'Hitta till oss',
  text,
  address = ['Storgatan 12', '123 45 Stad'],
  phone,
  email,
  hours,
  mapEmbedUrl,
}: ContactMapProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[80rem] gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
          {text ? <p className="mt-2 text-muted-foreground">{text}</p> : null}
          <dl className="mt-8 space-y-5">
            <Row icon={MapPin} label="Adress">
              {address.map((line, i) => <span key={i} className="block">{line}</span>)}
            </Row>
            {phone ? <Row icon={Phone} label="Telefon"><a href={toTelHref(phone)} className="whitespace-nowrap underline-offset-4 hover:underline">{phone}</a></Row> : null}
            {email ? <Row icon={Mail} label="E-post"><a href={`mailto:${email}`} className="underline-offset-4 hover:underline">{email}</a></Row> : null}
            {hours?.length ? <Row icon={Clock} label="Öppettider">{hours.map((line, i) => <span key={i} className="block">{line}</span>)}</Row> : null}
          </dl>
        </div>
        {mapEmbedUrl ? (
          <div className="overflow-hidden rounded-lg border border-border bg-muted">
            <iframe src={mapEmbedUrl} title={`Karta till ${address[0] ?? 'oss'}`} className="aspect-[4/3] h-auto w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Row({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <div>
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="text-foreground">{children}</dd>
      </div>
    </div>
  );
}
