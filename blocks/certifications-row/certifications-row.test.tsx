import { render, screen } from '@testing-library/react';
import CertificationsRow from './certifications-row';
import { sample } from './sample';

describe('certifications-row', () => {
  it('renders every item with mark, title and text; links only when href is set', () => {
    render(<CertificationsRow {...sample} />);
    for (const c of sample.items) {
      expect(screen.getByText(c.title)).toBeInTheDocument();
      expect(screen.getByText(c.text)).toBeInTheDocument();
      if (c.image) expect(screen.getByAltText(c.image.alt)).toBeInTheDocument();
    }
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', 'https://tryggehandel.se');
    expect(links[0]).toHaveAttribute('target', '_blank');
  });

  it('maps the column count to a literal class', () => {
    const { container } = render(<CertificationsRow items={sample.items.slice(0, 3)} title={null} variant="plain" />);
    expect(container.querySelector('ul')?.className).toContain('lg:grid-cols-3');
    expect(container.querySelector('section')?.className).toContain('bg-background');
  });
});
