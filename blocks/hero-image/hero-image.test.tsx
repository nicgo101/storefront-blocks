import { render, screen } from '@testing-library/react';
import HeroImage from './hero-image';
import { sample } from './sample';

describe('hero-image', () => {
  it('renders title, text, buttons and image (split)', () => {
    render(<HeroImage {...sample} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(sample.title);
    expect(screen.getByText(sample.text!)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: sample.primary.label })).toHaveAttribute('href', sample.primary.href);
    expect(screen.getByRole('link', { name: sample.secondary!.label })).toHaveAttribute('href', sample.secondary!.href);
    expect(screen.getByAltText(sample.image.alt)).toBeInTheDocument();
  });

  it('renders the centered layout without a secondary button', () => {
    render(<HeroImage {...sample} secondary={undefined} layout="centered" />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByAltText(sample.image.alt)).toBeInTheDocument();
  });
});
