'use client';

import { useId, useState } from 'react';
import Image from 'next/image';

export type BeforeAfterProps = {
  title?: string | null;
  text?: string;
  /** Both images must have the same aspect ratio; they are laid over each other. */
  before: { src: string; alt: string; width: number; height: number };
  after: { src: string; alt: string; width: number; height: number };
  beforeLabel?: string;
  afterLabel?: string;
  /** Initial slider position in percent (0 = all "after", 100 = all "before"). */
  initial?: number;
  width?: 'narrow' | 'wide';
};

/**
 * A range input drives the split, so it works with keyboard, touch and mouse without any
 * pointer maths. The thumb is stretched to the full height and made invisible; the
 * visible handle is drawn at the same position.
 */
export default function BeforeAfter({ title = null, text, before, after, beforeLabel = 'Före', afterLabel = 'Efter', initial = 50, width = 'wide' }: BeforeAfterProps) {
  const [pos, setPos] = useState(Math.min(100, Math.max(0, initial)));
  const id = useId();
  return (
    <section className="bg-background">
      <div className={width === 'narrow' ? 'mx-auto max-w-3xl px-6 py-16 md:py-20' : 'mx-auto max-w-[80rem] px-6 py-16 md:py-20'}>
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <div className={`relative select-none overflow-hidden rounded-lg bg-muted ${title || text ? 'mt-8' : ''}`} style={{ aspectRatio: `${after.width} / ${after.height}` }}>
          <Image src={after.src} alt={after.alt} width={after.width} height={after.height} sizes="(min-width: 1280px) 80rem, 100vw" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={before.src} alt={before.alt} width={before.width} height={before.height} sizes="(min-width: 1280px) 80rem, 100vw" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
          </div>
          <span className="pointer-events-none absolute top-3 left-3 rounded bg-background/85 px-2 py-0.5 text-xs font-medium text-foreground">{beforeLabel}</span>
          <span className="pointer-events-none absolute top-3 right-3 rounded bg-background/85 px-2 py-0.5 text-xs font-medium text-foreground">{afterLabel}</span>
          <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-background shadow" style={{ left: `calc(${pos}% - 1px)` }} aria-hidden="true">
            <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-lg">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6-4 6 4 6M15 6l4 6-4 6" /></svg>
            </span>
          </div>
          <label htmlFor={id} className="sr-only">Dra för att jämföra {beforeLabel.toLowerCase()} och {afterLabel.toLowerCase()}</label>
          <input id={id} type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" aria-valuetext={`${pos} % ${beforeLabel.toLowerCase()}`} />
        </div>
      </div>
    </section>
  );
}
