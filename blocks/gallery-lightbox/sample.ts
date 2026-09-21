import type { GalleryLightboxProps } from './gallery-lightbox';

const img = (seed: string, alt: string, w = 1200, h = 900) => ({ src: `https://picsum.photos/seed/${seed}/${w}/${h}`, alt, width: w, height: h });

export const sample: GalleryLightboxProps = {
  title: 'Från verkstaden',
  images: [
    img('g1', 'Montering av pump'),
    img('g2', 'Lager med reservdelar', 900, 1200),
    img('g3', 'Servicebil på väg'),
    img('g4', 'Kalibrering av sensor'),
    img('g5', 'Butiken utifrån', 1600, 900),
    img('g6', 'Utbildning hos kund'),
  ],
  columns: 3,
  thumbs: 'square',
};
