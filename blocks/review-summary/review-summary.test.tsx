import { render, screen } from '@testing-library/react';
import ReviewSummary, { formatRating } from './review-summary';
import { sample } from './sample';

describe('review-summary', () => {
  it('renders labelled stars, the rating, the count and the link', () => {
    render(<ReviewSummary {...sample} />);
    expect(screen.getByRole('img', { name: '4,7 av 5 stjärnor' })).toBeInTheDocument();
    expect(screen.getByText('4,7')).toBeInTheDocument();
    expect(screen.getByText(/Baserat på 1\s?284 omdömen/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: sample.linkLabel })).toHaveAttribute('href', sample.href);
  });

  it('renders the inline variant as a paragraph and opens external links in a new tab', () => {
    const { container } = render(<ReviewSummary rating={5.4} count={12} href="https://se.trustpilot.com/review/x" variant="inline" />);
    expect(container.firstElementChild?.tagName).toBe('P');
    expect(screen.getByRole('img', { name: '5,0 av 5 stjärnor' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    expect(formatRating(4)).toBe('4,0');
  });
});
