import type { StatsRowProps } from './stats-row';

export const sample: StatsRowProps = {
  title: 'Därför handlar man hos oss',
  stats: [
    { value: '12 000+', label: 'nöjda kunder' },
    { value: '4,8 av 5', label: 'i snittbetyg' },
    { value: '1 till 3', label: 'dagars leverans' },
    { value: '30', label: 'dagars öppet köp' },
  ],
  variant: 'plain',
};
