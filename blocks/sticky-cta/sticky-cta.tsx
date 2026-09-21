'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar, ShoppingBag, ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const STICKY_ICONS = { phone: Phone, chat: MessageCircle, calendar: Calendar, bag: ShoppingBag, arrow: ArrowRight } satisfies Record<string, LucideIcon>;

export type StickyCtaProps = {
  label: string;
  /** `tel:`, `mailto:`, `#anchor` or a site-relative path. */
  href: string;
  icon?: keyof typeof STICKY_ICONS;
  /** Show only after the visitor has scrolled this many pixels (0 = always). */
  showAfter?: number;
  /** `mobile`: phones and tablets only (hidden from `md`). `all`: every width, bottom right. */
  on?: 'mobile' | 'all';
};

export function toTelHref(display: string): string {
  const digits = display.replace(/[^\d+]/g, '');
  return 'tel:' + (digits.startsWith('+') ? digits : digits.startsWith('0') ? '+46' + digits.slice(1) : digits);
}

export default function StickyCta({ label, href, icon = 'phone', showAfter = 0, on = 'mobile' }: StickyCtaProps) {
  const [visible, setVisible] = useState(showAfter === 0);
  useEffect(() => {
    if (showAfter === 0) return;
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);
  const Icon = STICKY_ICONS[icon] ?? Phone;
  const external = /^(tel|mailto):/.test(href);
  const cls = cn(
    'fixed z-40 flex items-center justify-center gap-2 bg-primary font-medium text-primary-foreground shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    on === 'mobile' ? 'inset-x-4 bottom-4 h-12 rounded-full md:hidden' : 'right-4 bottom-4 h-12 rounded-full px-5',
    visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
  );
  const inner = <><Icon className="size-5" aria-hidden="true" />{label}</>;
  return external
    ? <a href={href} className={cls} aria-hidden={!visible} tabIndex={visible ? 0 : -1}>{inner}</a>
    : <Link href={href} className={cls} aria-hidden={!visible} tabIndex={visible ? 0 : -1}>{inner}</Link>;
}
