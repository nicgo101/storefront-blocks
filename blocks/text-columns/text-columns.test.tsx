import { render, screen } from '@testing-library/react';
import TextColumns from './text-columns';
import { sample } from './sample';

describe('text-columns', () => {
  it('renders every column with heading, paragraphs and link', () => {
    render(<TextColumns {...sample} />);
    for (const c of sample.columns) {
      expect(screen.getByRole('heading', { level: 3, name: c.title })).toBeInTheDocument();
      for (const p of c.paragraphs) expect(screen.getByText(p)).toBeInTheDocument();
      if (c.link) expect(screen.getByRole('link', { name: c.link.label })).toHaveAttribute('href', c.link.href);
    }
    expect(screen.getAllByRole('link')).toHaveLength(sample.columns.filter((c) => c.link).length);
  });

  it('maps the column count and the band variant', () => {
    const { container } = render(<TextColumns columns={sample.columns.slice(0, 2)} variant="band" />);
    expect(container.querySelector('.grid')?.className).toContain('md:grid-cols-2');
    expect(container.querySelector('section')?.className).toContain('bg-muted');
  });
});
