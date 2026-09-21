import { render, screen } from '@testing-library/react';
import StatsRow from './stats-row';
import { sample } from './sample';

describe('stats-row', () => {
  it('renders every value and label', () => {
    render(<StatsRow {...sample} />);
    for (const s of sample.stats) {
      expect(screen.getByText(s.value)).toBeInTheDocument();
      expect(screen.getByText(s.label)).toBeInTheDocument();
    }
  });

  it('maps the column count to a literal Tailwind class', () => {
    const { container } = render(<StatsRow stats={sample.stats.slice(0, 3)} />);
    expect(container.querySelector('dl')?.className).toContain('md:grid-cols-3');
  });
});
