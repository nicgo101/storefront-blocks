import type { ImageTextProps } from './image-text';

export const sample: ImageTextProps = {
  title: 'Därför handlar man hos oss',
  items: [
    { title: 'Vi vet vad som passar', text: 'Tjugo år med samma maskiner ger en känsla för vad som håller. Vi säljer bara det vi själva skulle välja.', image: { src: 'https://picsum.photos/seed/it-1/1000/750', alt: 'Verkstad', width: 1000, height: 750 }, cta: { label: 'Om oss', href: '/om-oss' } },
    { title: 'Snabbt hem till dig', text: 'Lagervaror skickas samma dag. Skrymmande gods körs med hemleverans, ända fram till dörren.', image: { src: 'https://picsum.photos/seed/it-2/1000/750', alt: 'Leverans', width: 1000, height: 750 } },
    { title: 'Hjälp när du behöver', text: 'Ring, mejla eller kom förbi. Vi svarar på vardagar 8 till 17 och hjälper dig hela vägen.', image: { src: 'https://picsum.photos/seed/it-3/1000/750', alt: 'Kundtjänst', width: 1000, height: 750 }, cta: { label: 'Kontakta oss', href: '/kontakt' } },
  ],
  start: 'image-left',
};
