import { render, screen } from '@testing-library/react';
import CtaBand from './cta-band';
import { sample } from './sample';

describe('cta-band', () => {
  it('renders heading, text and the button link', () => {
    render(<CtaBand {...sample} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(sample.title);
    expect(screen.getByText(sample.text!)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: sample.button.label })).toHaveAttribute('href', sample.button.href);
  });

  it('renders the muted tone', () => {
    const { container } = render(<CtaBand {...sample} tone="muted" />);
    expect(container.querySelector('section')?.className).toContain('bg-muted');
  });
});
