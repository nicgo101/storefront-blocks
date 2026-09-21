import { render, screen } from '@testing-library/react';
import PromoTiles from './promo-tiles';
import { sample } from './sample';

describe('promo-tiles', () => {
  it('renders one link per tile with title, text and label; the first spans two columns in wide layout', () => {
    const { container } = render(<PromoTiles {...sample} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    sample.tiles.forEach((t, i) => {
      expect(links[i]).toHaveAttribute('href', t.href);
      expect(links[i]).toHaveTextContent(t.title);
      expect(links[i]).toHaveTextContent(t.linkLabel!);
    });
    expect(container.querySelectorAll('li')[0].className).toContain('md:col-span-2');
    expect(links[2].className).toContain('text-foreground');
  });

  it('uses two columns for two tiles and ignores a fourth', () => {
    const { container } = render(<PromoTiles tiles={[...sample.tiles, sample.tiles[0]]} layout="even" />);
    expect(screen.getAllByRole('link')).toHaveLength(3);
    const two = render(<PromoTiles tiles={sample.tiles.slice(0, 2)} />);
    expect(two.container.querySelector('ul')?.className).toContain('md:grid-cols-2');
    expect(container.querySelector('ul')?.className).toContain('md:grid-cols-3');
  });
});
