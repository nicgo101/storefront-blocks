import type { PricingTableProps } from './pricing-table';

export const sample: PricingTableProps = {
  title: 'Serviceavtal',
  text: 'Välj den nivå som passar din maskinpark. Alla avtal går att säga upp månadsvis.',
  plans: [
    { name: 'Bas', price: '299 kr', period: 'per månad', text: 'För en maskin.', features: ['Årlig service', 'Telefonsupport vardagar', '10 % på reservdelar'], cta: { label: 'Välj Bas', href: '/kontakt?avtal=bas' } },
    { name: 'Plus', price: '599 kr', period: 'per månad', text: 'Upp till tre maskiner.', features: ['Service två gånger per år', 'Support alla dagar', '15 % på reservdelar', 'Lånemaskin vid reparation'], cta: { label: 'Välj Plus', href: '/kontakt?avtal=plus' }, highlighted: true, badge: 'Populärast' },
    { name: 'Företag', price: 'Offert', text: 'Obegränsat antal maskiner.', features: ['Skräddarsydd serviceplan', 'Egen kontaktperson', 'Fakturering per kvartal'], cta: { label: 'Begär offert', href: '/kontakt?avtal=foretag' } },
  ],
};
