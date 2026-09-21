import { render, screen } from '@testing-library/react';
import RichText from './rich-text';
import { sample } from './sample';

describe('rich-text', () => {
  it('renders eyebrow, title and the html body with prose classes', () => {
    const { container } = render(<RichText {...sample} />);
    expect(screen.getByText(sample.eyebrow!)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(sample.title!);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Det vi tror på');
    expect(screen.getByRole('link', { name: 'verkstaden' })).toHaveAttribute('href', '/verkstad');
    expect(container.querySelector('.prose')).toBeInTheDocument();
  });

  it('renders children when no html is given, wide and large', () => {
    const { container } = render(<RichText width="wide" size="lg"><p>Hej</p></RichText>);
    expect(screen.getByText('Hej')).toBeInTheDocument();
    expect(container.querySelector('.prose')?.className).toContain('prose-lg');
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
