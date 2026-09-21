import { render, screen, fireEvent } from '@testing-library/react';
import FaqAccordion from './faq-accordion';
import { sample } from './sample';

describe('faq-accordion', () => {
  it('renders the heading and every question, answers hidden until opened', () => {
    render(<FaqAccordion {...sample} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(sample.title!);
    for (const item of sample.items) expect(screen.getByRole('button', { name: item.q })).toBeInTheDocument();
    expect(screen.queryByText(sample.items[0].a)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: sample.items[0].q }));
    expect(screen.getByText(sample.items[0].a)).toBeInTheDocument();
  });

  it('renders without a heading when title is undefined', () => {
    render(<FaqAccordion {...sample} title={null} text={undefined} />);
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });
});
