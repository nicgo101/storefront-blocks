import { render, screen, fireEvent } from '@testing-library/react';
import TabsContentBlock from './tabs-content';
import { sample } from './sample';

describe('tabs-content', () => {
  it('renders every tab, shows the first panel and switches on click', () => {
    render(<TabsContentBlock {...sample} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((t) => t.textContent)).toEqual(sample.tabs.map((t) => t.label));
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(sample.tabs[0].paragraphs![0])).toBeInTheDocument();
    fireEvent.mouseDown(tabs[2]);
    fireEvent.click(tabs[2]);
    expect(screen.getByText(sample.tabs[2].paragraphs![0])).toBeInTheDocument();
  });

  it('opens defaultTab first and renders JSX content', () => {
    render(<TabsContentBlock tabs={[{ id: 'a', label: 'A', paragraphs: ['aa'] }, { id: 'b', label: 'B', content: <strong>bb</strong> }]} defaultTab="b" />);
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('bb').tagName).toBe('STRONG');
  });
});
