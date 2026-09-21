import { render, screen } from '@testing-library/react';
import StoreLocations from './store-locations';
import { sample } from './sample';

describe('store-locations', () => {
  it('renders one card per location with address, hours, note and links', () => {
    render(<StoreLocations {...sample} />);
    for (const l of sample.locations) {
      expect(screen.getByRole('heading', { level: 3, name: l.name })).toBeInTheDocument();
      for (const a of l.address) expect(screen.getByText(a)).toBeInTheDocument();
      if (l.phone) expect(screen.getByRole('link', { name: l.phone })).toHaveAttribute('href', 'tel:+46' + l.phone.replace(/[^\d]/g, '').slice(1));
      if (l.note) expect(screen.getByText(l.note)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('link', { name: 'Visa på karta' })).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'uppsala@exempel.se' })).toHaveAttribute('href', 'mailto:uppsala@exempel.se');
  });

  it('maps the column count to a literal class', () => {
    const { container } = render(<StoreLocations locations={sample.locations.slice(0, 2)} columns={2} title={null} />);
    expect(container.querySelector('ul')?.className).toContain('md:grid-cols-2');
  });
});
