'use client';

import { useEffect, useState } from 'react';

export type CampaignCountdownProps = {
  /** ISO date-time with offset, e.g. `2026-12-24T23:59:00+01:00`. */
  endsAt: string;
  /** Label before the numbers. */
  label?: string;
};

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60) };
}

/** Renders nothing on the server and until mounted (no hydration mismatch), and nothing once the date has passed. */
export default function CampaignCountdown({ endsAt, label = 'Slutar om' }: CampaignCountdownProps) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = Date.parse(endsAt);
    if (Number.isNaN(end)) return;
    const tick = () => setLeft(end - Date.now());
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, [endsAt]);
  if (left === null || left <= 0) return null;
  const { d, h, m } = parts(left);
  const units: [number, string][] = [[d, 'dagar'], [h, 'tim'], [m, 'min']];
  return (
    <p className="mt-6 flex items-baseline gap-3 text-foreground" aria-live="polite">
      <span className="text-sm uppercase tracking-wide text-muted-foreground">{label}</span>
      {units.map(([n, u]) => (
        <span key={u} className="tabular-nums"><span className="text-2xl font-bold">{n}</span> <span className="text-sm text-muted-foreground">{u}</span></span>
      ))}
    </p>
  );
}
