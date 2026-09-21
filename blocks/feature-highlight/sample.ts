import type { FeatureHighlightProps } from './feature-highlight';

export const sample: FeatureHighlightProps = {
  eyebrow: 'Serviceavtal',
  title: 'Vi håller maskinen igång',
  text: 'Ett avtal, inga överraskningar. Vi kommer när det är dags och du slipper hålla reda på intervallen.',
  image: { src: 'https://picsum.photos/seed/feature-1/1000/800', alt: 'Tekniker vid en pump', width: 1000, height: 800 },
  features: [
    { icon: 'clock', title: 'Service i tid', text: 'Vi bokar in oss, du behöver inte komma ihåg.' },
    { icon: 'wrench', title: 'Originaldelar', text: 'Bara delar från tillverkaren, med garanti.' },
    { icon: 'headset', title: 'En kontaktperson', text: 'Samma tekniker känner din anläggning.' },
    { icon: 'shield', title: 'Fast pris', text: 'Ingen timdebitering, inga tillägg.' },
  ],
  cta: { label: 'Se avtalen', href: '/serviceavtal' },
  imageSide: 'left',
};
