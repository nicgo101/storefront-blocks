import { render, screen } from '@testing-library/react';
import Steps from './steps';
import { sample } from './sample';

describe('steps', () => {
  it('renders an ordered list with every step', () => {
    render(<Steps {...sample} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(sample.title!);
    expect(screen.getByRole('list').tagName).toBe('OL');
    expect(screen.getAllByRole('listitem')).toHaveLength(sample.steps.length);
    for (const s of sample.steps) {
      expect(screen.getByRole('heading', { level: 3, name: s.title })).toBeInTheDocument();
      expect(screen.getByText(s.text)).toBeInTheDocument();
    }
  });

  it('stacks in list layout', () => {
    const { container } = render(<Steps {...sample} layout="list" />);
    expect(container.querySelector('ol')?.className).toContain('flex-col');
  });
});
