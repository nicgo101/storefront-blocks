import type { DownloadListProps } from './download-list';

export const sample: DownloadListProps = {
  title: 'Manualer och prislistor',
  text: 'Öppnas som PDF. Saknar du något? Ring så mejlar vi.',
  files: [
    { title: 'Bruksanvisning pump P-200', href: '/manualer/p-200.pdf', description: 'Installation, skötsel och felsökning.', size: '2,4 MB' },
    { title: 'Prislista reservdelar 2026', href: '/dokument/prislista-2026.pdf', size: '640 kB' },
    { title: 'Serviceprotokoll', href: '/dokument/serviceprotokoll.xlsx', description: 'Fyll i och ta med till verkstaden.', size: '48 kB' },
    { title: 'Måttskiss montering', href: '/dokument/mattskiss.png', size: '1,1 MB' },
  ],
  layout: 'list',
};
