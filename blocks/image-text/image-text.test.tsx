import { render, screen } from '@testing-library/react';
import ImageText from './image-text';
import { sample } from './sample';

describe('image-text', () => {
  it('renders every row with heading, text, image and optional button', () => {
    render(<ImageText {...sample} />);
    for (const item of sample.items) {
      expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.text)).toBeInTheDocument();
      expect(screen.getByAltText(item.image.alt)).toBeInTheDocument();
      if (item.cta) expect(screen.getByRole('link', { name: item.cta.label })).toHaveAttribute('href', item.cta.href);
    }
    expect(screen.getAllByRole('link')).toHaveLength(sample.items.filter((i) => i.cta).length);
  });

  it('alternates the image side, honouring start', () => {
    const { container } = render(<ImageText {...sample} title={null} start="image-right" />);
    const rows = container.querySelectorAll('.grid');
    expect(rows[0].firstElementChild?.className).toContain('md:order-2');
    expect(rows[1].firstElementChild?.className).toContain('md:order-1');
  });
});
