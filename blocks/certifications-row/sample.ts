import type { CertificationsRowProps } from './certifications-row';

export const sample: CertificationsRowProps = {
  title: 'Certifieringar och märkningar',
  text: 'Det här står bakom det vi säljer och hur vi jobbar.',
  items: [
    { title: 'Auktoriserad verkstad', text: 'Godkänd av tillverkaren för garantiservice på alla modeller vi säljer.', image: { src: 'https://picsum.photos/seed/cert-1/200/200', alt: 'Auktoriserad verkstad', width: 200, height: 200 } },
    { title: 'Trygg e-handel', text: 'Granskade villkor, säker betalning och tydlig ångerrätt.', image: { src: 'https://picsum.photos/seed/cert-2/200/200', alt: 'Trygg e-handel', width: 200, height: 200 }, href: 'https://tryggehandel.se' },
    { title: 'Miljömärkt frakt', text: 'Alla paket skickas med fossilfri transport inom Sverige.' },
    { title: 'ISO 9001', text: 'Kvalitetsledning i verkstad och lager, reviderat varje år.' },
  ],
  variant: 'band',
};
