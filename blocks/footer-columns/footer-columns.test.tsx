import { render, screen } from '@testing-library/react';
import FooterColumns from './footer-columns';
import { sample } from './sample';

describe('footer-columns', () => {
  it('renders brand, contact, social, columns, legal links and the year', async () => {
    render(await FooterColumns({ ...sample }));
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(sample.brand)).toBeInTheDocument();
    for (const c of sample.columns) {
      expect(screen.getByRole('navigation', { name: c.title })).toBeInTheDocument();
      for (const l of c.links) expect(screen.getByRole('link', { name: l.label })).toHaveAttribute('href', l.href);
    }
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://instagram.com/exempel');
    expect(screen.getByRole('link', { name: sample.contact!.phone })).toHaveAttribute('href', 'tel:+4618123456');
    expect(screen.getByRole('link', { name: sample.contact!.email })).toHaveAttribute('href', 'mailto:hej@exempel.se');
    for (const l of sample.legal!) expect(screen.getByRole('link', { name: l.label })).toHaveAttribute('href', l.href);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} Trädgårdsboden AB`))).toBeInTheDocument();
  });

  it('maps the column count to a literal class and works with the minimum props', async () => {
    const { container } = render(await FooterColumns({ brand: 'X', columns: [{ title: 'A', links: [] }, { title: 'B', links: [] }] }));
    expect(container.querySelector('.grid')?.className).toContain('md:grid-cols-3');
    expect(screen.getByText(`© ${new Date().getFullYear()} X`)).toBeInTheDocument();
  });
});
