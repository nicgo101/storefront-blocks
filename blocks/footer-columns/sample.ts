import type { FooterColumnsProps } from './footer-columns';

export const sample: FooterColumnsProps = {
  brand: 'Trädgårdsboden',
  tagline: 'Verktyg, jord och växter från odlare vi känner. Butik och verkstad i Uppsala sedan 2004.',
  columns: [
    { title: 'Handla', links: [{ label: 'Odling', href: '/collection/odling' }, { label: 'Verktyg', href: '/collection/verktyg' }, { label: 'Bevattning', href: '/collection/bevattning' }, { label: 'Kampanj', href: '/collection/kampanj' }] },
    { title: 'Kundservice', links: [{ label: 'Frakt och leverans', href: '/fraktvillkor' }, { label: 'Returer', href: '/returpolicy' }, { label: 'Vanliga frågor', href: '/faq' }, { label: 'Kontakt', href: '/kontakt' }] },
    { title: 'Om oss', links: [{ label: 'Vår historia', href: '/om-oss' }, { label: 'Verkstad', href: '/verkstad' }, { label: 'Jobba hos oss', href: '/jobb' }] },
  ],
  contact: { address: ['Storgatan 12', '753 20 Uppsala'], phone: '018-12 34 56', email: 'hej@exempel.se' },
  social: [{ network: 'facebook', href: 'https://facebook.com/exempel' }, { network: 'instagram', href: 'https://instagram.com/exempel' }, { network: 'youtube', href: 'https://youtube.com/@exempel' }],
  legal: [{ label: 'Köpvillkor', href: '/kopvillkor' }, { label: 'Integritetspolicy', href: '/integritetspolicy' }, { label: 'Cookies', href: '/cookies' }],
  copyright: '© {year} {brand} AB. Org.nr 556000-0000.',
};
