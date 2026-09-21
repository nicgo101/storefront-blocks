import type { PromoTilesProps } from './promo-tiles';

export const sample: PromoTilesProps = {
  tiles: [
    { eyebrow: 'Just nu', title: 'Sommarrea', text: 'Upp till 40 % på jord, krukor och redskap.', href: '/collection/kampanj', linkLabel: 'Till rean', image: { src: 'https://picsum.photos/seed/promo-1/1200/800', alt: '', width: 1200, height: 800 } },
    { eyebrow: 'Nyhet', title: 'Bevattning som sköter sig själv', href: '/collection/bevattning', linkLabel: 'Se sortimentet', image: { src: 'https://picsum.photos/seed/promo-2/1200/800', alt: '', width: 1200, height: 800 } },
    { title: 'Boka service', text: 'Vi hämtar, lagar och lämnar tillbaka.', href: '/verkstad', linkLabel: 'Boka', image: { src: 'https://picsum.photos/seed/promo-3/1200/800', alt: '', width: 1200, height: 800 }, tone: 'light' },
  ],
  layout: 'wide',
  height: 'short',
};
