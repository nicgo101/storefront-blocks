import { render, screen } from '@testing-library/react';
import CtaCards from './cta-cards';
import { sample } from './sample';

describe('cta-cards', () => {
  it('renders one link per card with title, text and label', () => {
    render(<CtaCards {...sample} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(sample.cards.length);
    sample.cards.forEach((c, i) => {
      expect(links[i]).toHaveAttribute('href', c.href);
      expect(links[i]).toHaveTextContent(c.title);
      expect(links[i]).toHaveTextContent(c.text);
      expect(links[i]).toHaveTextContent(c.linkLabel ?? 'Läs mer');
    });
  });

  it('prefers the image over the icon and maps the column count', () => {
    const { container } = render(<CtaCards cards={[{ title: 'A', text: 'a', href: '/a', icon: 'star', image: { src: '/x.jpg', alt: 'X', width: 600, height: 400 } }, { title: 'B', text: 'b', href: '/b' }]} />);
    expect(screen.getByAltText('X')).toBeInTheDocument();
    expect(container.querySelector('ul')?.className).toContain('md:grid-cols-2');
    expect(screen.getAllByText('Läs mer')).toHaveLength(2);
  });
});
