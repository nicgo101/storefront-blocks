import type { BreadcrumbsProps } from './breadcrumbs';

export const sample: BreadcrumbsProps = {
  items: [
    { label: 'Odling', href: '/collection/odling' },
    { label: 'Odlingslådor', href: '/collection/odlingslador' },
    { label: 'Odlingslåda ek 120 cm' },
  ],
  homeLabel: 'Hem',
  homeHref: '/',
  jsonLd: true,
  siteUrl: 'https://www.exempel.se',
};
