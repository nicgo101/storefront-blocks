import { render, screen } from '@testing-library/react';
import TeamGrid from './team-grid';
import { sample } from './sample';

describe('team-grid', () => {
  it('renders every member with photo, role and contact links', () => {
    render(<TeamGrid {...sample} />);
    for (const m of sample.members) {
      expect(screen.getByRole('heading', { level: 3, name: m.name })).toBeInTheDocument();
      expect(screen.getByText(m.role)).toBeInTheDocument();
      expect(screen.getByAltText(m.name)).toBeInTheDocument();
      if (m.email) expect(screen.getByRole('link', { name: m.email })).toHaveAttribute('href', `mailto:${m.email}`);
      if (m.phone) expect(screen.getByRole('link', { name: m.phone })).toHaveAttribute('href', 'tel:+46' + m.phone.replace(/[^\d]/g, '').slice(1));
    }
  });

  it('renders without photos and maps columns to a literal class', () => {
    const { container } = render(<TeamGrid members={[{ name: 'X', role: 'Y' }]} columns={4} title={null} />);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('ul')?.className).toContain('md:grid-cols-4');
  });
});
