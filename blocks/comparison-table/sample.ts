import type { ComparisonTableProps } from './comparison-table';

export const sample: ComparisonTableProps = {
  title: 'Jämför serviceavtalen',
  text: 'Alla avtal går att säga upp månadsvis.',
  rowHeader: 'Ingår',
  columns: [
    { name: 'Bas', price: '299 kr/mån', cta: { label: 'Välj Bas', href: '/kontakt?avtal=bas' } },
    { name: 'Plus', price: '599 kr/mån', cta: { label: 'Välj Plus', href: '/kontakt?avtal=plus' }, highlighted: true },
    { name: 'Företag', price: 'Offert', cta: { label: 'Begär offert', href: '/kontakt?avtal=foretag' } },
  ],
  rows: [
    { label: 'Årlig service', values: [true, true, true] },
    { label: 'Service två gånger per år', values: [false, true, true] },
    { label: 'Telefonsupport', values: ['Vardagar', 'Alla dagar', 'Alla dagar'] },
    { label: 'Rabatt på reservdelar', values: ['10 %', '15 %', '20 %'] },
    { label: 'Lånemaskin vid reparation', values: [false, true, true] },
    { label: 'Egen kontaktperson', values: [false, false, true] },
  ],
};
