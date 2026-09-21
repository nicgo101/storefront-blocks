import type { TeamGridProps } from './team-grid';

const img = (seed: string) => ({ src: `https://picsum.photos/seed/${seed}/600/600`, width: 600, height: 600 });

export const sample: TeamGridProps = {
  title: 'Vi som jobbar här',
  text: 'Ring eller mejla den som passar bäst. Alla svarar på vardagar 8 till 17.',
  members: [
    { name: 'Anna Lind', role: 'Butik och rådgivning', image: img('team-1'), email: 'anna@exempel.se', phone: '018-12 34 56' },
    { name: 'Per Holm', role: 'Verkstad', image: img('team-2'), phone: '018-12 34 57' },
    { name: 'Maria Svensson', role: 'Order och leverans', image: img('team-3'), email: 'maria@exempel.se' },
  ],
  columns: 3,
};
