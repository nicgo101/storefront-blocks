import { render, screen } from '@testing-library/react';
import FeatureHighlight from './feature-highlight';
import { sample } from './sample';

describe('feature-highlight', () => {
  it('renders eyebrow, heading, image, every feature and the button', () => {
    render(<FeatureHighlight {...sample} />);
    expect(screen.getByText(sample.eyebrow!)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(sample.title);
    expect(screen.getByAltText(sample.image.alt)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(sample.features.length);
    for (const f of sample.features) expect(screen.getByText(f.title)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: sample.cta!.label })).toHaveAttribute('href', sample.cta!.href);
  });

  it('puts the image on the right when asked and works without a cta', () => {
    const { container } = render(<FeatureHighlight {...sample} cta={undefined} imageSide="right" />);
    expect(container.querySelector('.grid > div')?.className).toContain('md:order-2');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
