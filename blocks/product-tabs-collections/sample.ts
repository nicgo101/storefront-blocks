import type { ProductTabsCollectionsProps } from './product-tabs-collections';

export const sample: ProductTabsCollectionsProps = {
  title: 'Just nu',
  tabs: [
    { label: 'Nyheter', slug: 'nyheter' },
    { label: 'Kampanj', slug: 'kampanj' },
    { label: 'Bästsäljare', slug: 'populara-produkter' },
  ],
  take: 8,
  moreLabel: 'Visa alla',
};
