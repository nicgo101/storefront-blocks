import type { TimelineProps } from './timeline';

export const sample: TimelineProps = {
  title: 'Vår historia',
  text: 'Från ett garage till tolv medarbetare.',
  items: [
    { label: '2004', title: 'Första pumpen', text: 'Vi lagade en pump som ingen annan ville ta i. Sedan nästa.' },
    { label: '2009', title: 'Butik på Storgatan', text: 'Verkstaden fick en butik och ett lager med reservdelar.', image: { src: 'https://picsum.photos/seed/tl-2009/800/500', alt: 'Butiken på Storgatan', width: 800, height: 500 } },
    { label: '2016', title: 'Webbshopen öppnar', text: 'Samma delar, hela landet, leverans på två dagar.' },
    { label: '2024', title: 'Tolv medarbetare', text: 'Servicebilar i tre län och rådgivning på telefon alla vardagar.' },
  ],
  layout: 'line',
};
