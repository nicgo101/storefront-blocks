import { render, screen } from '@testing-library/react';
import PricingTable from './pricing-table';
import { sample } from './sample';

describe('pricing-table', () => {
  it('renders every plan with price, features and a link', () => {
    render(<PricingTable {...sample} />);
    for (const p of sample.plans) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
      expect(screen.getByText(p.price)).toBeInTheDocument();
      for (const f of p.features) expect(screen.getByText(f)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: p.cta.label })).toHaveAttribute('href', p.cta.href);
    }
    expect(screen.getByText('Populärast')).toBeInTheDocument();
  });

  it('maps the plan count to a literal column class', () => {
    const { container } = render(<PricingTable plans={sample.plans.slice(0, 2)} title={null} />);
    expect(container.querySelector('.grid')?.className).toContain('md:grid-cols-2');
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });
});
