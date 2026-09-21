'use client';

import { useEffect } from 'react';

/** What the product page records; the list block renders exactly this. */
export type ViewedProduct = {
  slug: string;
  name: string;
  /** Image URL (a Vendure asset preview). */
  preview?: string | null;
  /** Shown as written: "499 kr", "från 299 kr". */
  price?: string;
};

export const RECENTLY_VIEWED_KEY = 'recently-viewed';
export const RECENTLY_VIEWED_MAX = 12;

/** Reads the stored list; empty when storage is blocked or the data is not what we wrote. */
export function readRecentlyViewed(): ViewedProduct[] {
  try {
    const raw = window.localStorage.getItem(RECENTLY_VIEWED_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((p) => p && typeof p.slug === 'string' && typeof p.name === 'string') : [];
  } catch {
    return [];
  }
}

export function recordViewed(product: ViewedProduct) {
  try {
    const rest = readRecentlyViewed().filter((p) => p.slug !== product.slug);
    window.localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify([product, ...rest].slice(0, RECENTLY_VIEWED_MAX)));
  } catch { /* storage blocked */ }
}

/** Place on the product page; renders nothing. */
export default function RecentlyViewedTracker({ slug, name, preview, price }: ViewedProduct) {
  useEffect(() => { recordViewed({ slug, name, preview, price }); }, [slug, name, preview, price]);
  return null;
}
