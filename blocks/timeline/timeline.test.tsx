import { render, screen } from '@testing-library/react';
import Timeline from './timeline';
import { sample } from './sample';

describe('timeline', () => {
  it('renders an ordered list with label, title, text and image per entry', () => {
    render(<Timeline {...sample} />);
    expect(screen.getByRole('list').tagName).toBe('OL');
    expect(screen.getAllByRole('listitem')).toHaveLength(sample.items.length);
    for (const item of sample.items) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeInTheDocument();
      if (item.image) expect(screen.getByAltText(item.image.alt)).toBeInTheDocument();
    }
  });

  it('alternates sides in the alternate layout', () => {
    const { container } = render(<Timeline {...sample} layout="alternate" title={null} text={undefined} />);
    const items = container.querySelectorAll('li');
    expect(items[0].className).toContain('md:text-right');
    expect(items[1].className).toContain('md:pl-[calc(50%+2.5rem)]');
  });
});
