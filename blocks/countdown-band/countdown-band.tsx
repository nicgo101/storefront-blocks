'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export type CountdownBandProps = {
  /** The message, e.g. "Sommarrean slutar snart". */
  title: string;
  text?: string;
  /** ISO date-time with offset, e.g. `2026-11-30T23:59:00+01:00`. The band disappears after it. */
  endsAt: string;
  link?: { label: string; href: string };
  tone?: 'primary' | 'muted';
};

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [[Math.floor(s / 86400), 'dagar'], [Math.floor((s % 86400) / 3600), 'tim'], [Math.floor((s % 3600) / 60), 'min'], [s % 60, 'sek']] as [number, string][];
}

/** Renders nothing on the server and until mounted (no hydration mismatch), and nothing once the date has passed. */
export default function CountdownBand({ title, text, endsAt, link, tone = 'primary' }: CountdownBandProps) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = Date.parse(endsAt);
    if (Number.isNaN(end)) return;
    const tick = () => setLeft(end - Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [endsAt]);
  if (left === null || left <= 0) return null;
  const primary = tone === 'primary';
  return (
    <section className={primary ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'} aria-live="polite">
      <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-4 px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-xl font-bold tracking-tight md:text-2xl">{title}</p>
          {text ? <p className={primary ? 'mt-1 text-primary-foreground/80' : 'mt-1 text-muted-foreground'}>{text}</p> : null}
        </div>
        <div className="flex items-center gap-4">
          <p className="flex gap-3 tabular-nums">
            {parts(left).map(([n, u]) => (
              <span key={u} className="flex flex-col items-center leading-none">
                <span className="text-3xl font-bold">{String(n).padStart(2, '0')}</span>
                <span className={primary ? 'mt-1 text-xs uppercase text-primary-foreground/80' : 'mt-1 text-xs uppercase text-muted-foreground'}>{u}</span>
              </span>
            ))}
          </p>
          {link ? <Button asChild variant={primary ? 'secondary' : 'default'}><Link href={link.href}>{link.label}</Link></Button> : null}
        </div>
      </div>
    </section>
  );
}
