import type { CtaCardsProps } from './cta-cards';

export const sample: CtaCardsProps = {
  title: 'Vad kan vi hjälpa till med?',
  cards: [
    { icon: 'wrench', title: 'Verkstad och service', text: 'Lämna in maskinen eller boka en servicetekniker hem till dig.', href: '/verkstad', linkLabel: 'Boka service' },
    { icon: 'book', title: 'Guider', text: 'Så väljer du rätt, så sköter du om det du köpt.', href: '/guider', linkLabel: 'Läs guiderna' },
    { icon: 'headset', title: 'Kundtjänst', text: 'Ring, mejla eller chatta. Vardagar 8 till 17.', href: '/kundservice', linkLabel: 'Kontakta oss' },
  ],
};
