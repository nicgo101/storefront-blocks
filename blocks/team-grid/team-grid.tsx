import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

export type TeamMember = {
  name: string;
  role: string;
  image?: { src: string; alt?: string; width: number; height: number };
  email?: string;
  phone?: string;
};

export type TeamGridProps = {
  title?: string | null;
  text?: string;
  members: TeamMember[];
  /** Columns from `md`; phones show 2. */
  columns?: 2 | 3 | 4;
};

const COLS: Record<number, string> = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

export function toTelHref(display: string): string {
  const digits = display.replace(/[^\d+]/g, '');
  return 'tel:' + (digits.startsWith('+') ? digits : digits.startsWith('0') ? '+46' + digits.slice(1) : digits);
}

export default function TeamGrid({ title = 'Vi som jobbar här', text, members, columns = 3 }: TeamGridProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ul className={`grid grid-cols-2 gap-8 ${COLS[columns]} ${title || text ? 'mt-10' : ''}`}>
          {members.map((m, i) => (
            <li key={i} className="flex flex-col">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                {m.image ? <Image src={m.image.src} alt={m.image.alt ?? m.name} width={m.image.width} height={m.image.height} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full object-cover" /> : null}
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
              {m.email || m.phone ? (
                <p className="mt-2 flex flex-col gap-1 text-sm">
                  {m.email ? <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline"><Mail className="size-4 text-primary" aria-hidden="true" />{m.email}</a> : null}
                  {m.phone ? <a href={toTelHref(m.phone)} className="inline-flex items-center gap-1.5 whitespace-nowrap text-foreground underline-offset-4 hover:underline"><Phone className="size-4 text-primary" aria-hidden="true" />{m.phone}</a> : null}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
