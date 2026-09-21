import type { AnnouncementBarProps } from './announcement-bar';

export const sample: AnnouncementBarProps = {
  text: 'Fri frakt på alla beställningar över 499 kr fram till söndag.',
  link: { label: 'Läs mer', href: '/fraktvillkor' },
  dismissible: true,
  id: 'fri-frakt-2026-09',
  tone: 'primary',
};
