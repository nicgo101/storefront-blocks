'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export type AnnouncementBarProps = {
  /** The message, one short line. */
  text: string;
  /** Optional link after the text. */
  link?: { label: string; href: string };
  /** Lets the visitor close the bar; remembered per browser under `id` until the id changes. */
  dismissible?: boolean;
  /** Change it when the message changes so a dismissed bar shows again. */
  id?: string;
  /** `primary`: brand colour. `muted`: soft background. */
  tone?: 'primary' | 'muted';
};

const KEY = 'announcement-bar-dismissed';

export default function AnnouncementBar({ text, link, dismissible = true, id = 'default', tone = 'primary' }: AnnouncementBarProps) {
  // Rendered on the server; the dismissed state is read after mount so markup matches.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    try { if (dismissible && window.localStorage.getItem(KEY) === id) setHidden(true); } catch { /* storage blocked */ }
  }, [dismissible, id]);
  if (hidden) return null;
  function dismiss() {
    setHidden(true);
    try { window.localStorage.setItem(KEY, id); } catch { /* storage blocked */ }
  }
  const primary = tone === 'primary';
  return (
    <div role="region" aria-label="Meddelande" className={primary ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}>
      <div className="mx-auto flex max-w-[80rem] items-center justify-center gap-3 px-6 py-2 text-sm">
        <p className="text-center">
          {text}
          {link ? <Link href={link.href} className="ml-2 font-medium underline underline-offset-4">{link.label}</Link> : null}
        </p>
        {dismissible ? (
          <button type="button" onClick={dismiss} aria-label="Stäng meddelandet" className={`ml-auto shrink-0 rounded p-1 ${primary ? 'hover:bg-primary-foreground/15' : 'hover:bg-foreground/10'}`}>
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
