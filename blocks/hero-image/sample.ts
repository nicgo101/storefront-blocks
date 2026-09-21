import type { HeroImageProps } from './hero-image';

export const sample: HeroImageProps = {
  title: 'Allt för din trädgård, levererat hem',
  text: 'Verktyg, jord och växter från odlare vi känner. Fri frakt över 499 kr och rådgivning på telefon alla vardagar.',
  image: { src: 'https://picsum.photos/seed/hero-garden/1200/900', alt: 'Trädgård i morgonljus', width: 1200, height: 900 },
  primary: { label: 'Handla nu', href: '/collection' },
  secondary: { label: 'Så funkar det', href: '/kundservice' },
  layout: 'split',
};
