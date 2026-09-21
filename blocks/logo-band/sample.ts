import type { LogoBandProps } from './logo-band';

const logo = (seed: string, alt: string, href?: string) => ({ src: `https://picsum.photos/seed/${seed}/240/80`, alt, width: 240, height: 80, href });

export const sample: LogoBandProps = {
  title: 'Märken vi säljer',
  logos: [
    logo('logo-a', 'Gardena', '/collection/gardena'),
    logo('logo-b', 'Fiskars', '/collection/fiskars'),
    logo('logo-c', 'Husqvarna', '/collection/husqvarna'),
    logo('logo-d', 'Weibulls'),
    logo('logo-e', 'Hozelock'),
    logo('logo-f', 'Kärcher'),
  ],
  tone: 'gray',
};
