import type { RecentlyViewedProps } from './recently-viewed';

/** `items` is showcase-only: a real page reads the visitor's own history from the browser. */
export const sample: RecentlyViewedProps = {
  title: 'Senast visade',
  take: 6,
  hrefTemplate: '/produkt/{slug}',
  items: [
    { slug: 'tradgardsslang-25-m', name: 'Trädgårdsslang 25 m', preview: 'https://picsum.photos/seed/rv-1/600/600', price: '499 kr' },
    { slug: 'planteringsspade', name: 'Planteringsspade', preview: 'https://picsum.photos/seed/rv-2/600/600', price: '134 kr' },
    { slug: 'odlingslada-ek', name: 'Odlingslåda ek', preview: 'https://picsum.photos/seed/rv-3/600/600', price: 'från 899 kr' },
    { slug: 'godsel-5-kg', name: 'Gödsel 5 kg', preview: 'https://picsum.photos/seed/rv-4/600/600', price: '129 kr' },
    { slug: 'beskarningssax', name: 'Beskärningssax', preview: 'https://picsum.photos/seed/rv-5/600/600', price: '249 kr' },
    { slug: 'regntunna-200-l', name: 'Regntunna 200 l', preview: 'https://picsum.photos/seed/rv-6/600/600', price: '1 290 kr' },
  ],
};
