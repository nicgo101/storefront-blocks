import { render, screen } from '@testing-library/react';
import UspRow from './usp-row';
import { sample } from './sample';

describe('usp-row', () => {
  it('renders every item title and text', () => {
    render(<UspRow {...sample} />);
    for (const item of sample.items) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      if (item.text) expect(screen.getByText(item.text)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('listitem')).toHaveLength(sample.items.length);
  });

  it('falls back to a star for an unknown icon name', () => {
    render(<UspRow items={[{ icon: 'nope' as never, title: 'X' }]} variant="plain" />);
    expect(screen.getByText('X')).toBeInTheDocument();
  });
});
