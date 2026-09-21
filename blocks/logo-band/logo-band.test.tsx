import { render, screen } from '@testing-library/react';
import LogoBand from './logo-band';
import { sample } from './sample';

describe('logo-band', () => {
  it('renders every logo, linked when href is set', () => {
    render(<LogoBand {...sample} />);
    for (const l of sample.logos) expect(screen.getByAltText(l.alt)).toBeInTheDocument();
    const linked = sample.logos.filter((l) => l.href);
    expect(screen.getAllByRole('link')).toHaveLength(linked.length);
    expect(screen.getByRole('link', { name: linked[0].alt })).toHaveAttribute('href', linked[0].href);
  });

  it('applies the grayscale class only in gray tone', () => {
    const { container, rerender } = render(<LogoBand {...sample} />);
    expect(container.querySelector('img')?.className).toContain('grayscale');
    rerender(<LogoBand {...sample} tone="color" />);
    expect(container.querySelector('img')?.className).not.toContain('grayscale');
  });
});
