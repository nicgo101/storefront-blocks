import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

// next/image renders through the Next loader; in jsdom a plain <img> is enough.
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, sizes, ...rest } = props as { fill?: boolean; priority?: boolean; sizes?: string };
    void fill; void priority; void sizes;
    return React.createElement('img', rest);
  },
}));

// embla needs layout; jsdom has none. ResizeObserver is enough for it to mount.
class RO { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
(globalThis as unknown as { ResizeObserver: typeof RO }).ResizeObserver = RO;
(globalThis as unknown as { IntersectionObserver: typeof RO }).IntersectionObserver = RO;
if (!window.matchMedia) {
  window.matchMedia = ((q: string) => ({ matches: false, media: q, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false })) as typeof window.matchMedia;
}
