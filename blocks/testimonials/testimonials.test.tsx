import { render, screen } from '@testing-library/react';
import Testimonials from './testimonials';
import { sample } from './sample';

describe('testimonials', () => {
  it('renders every quote, name and a labelled star rating', () => {
    render(<Testimonials {...sample} />);
    for (const t of sample.items) {
      expect(screen.getByText(`“${t.quote}”`)).toBeInTheDocument();
      expect(screen.getByText(t.name)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('img', { name: /av 5 stjärnor/ })).toHaveLength(sample.items.length);
    expect(screen.getByRole('img', { name: '4 av 5 stjärnor' })).toBeInTheDocument();
  });

  it('hides the heading with title null', () => {
    render(<Testimonials {...sample} title={null} text={undefined} />);
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });
});
