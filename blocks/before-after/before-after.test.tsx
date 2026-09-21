import { render, screen, fireEvent } from '@testing-library/react';
import BeforeAfter from './before-after';
import { sample } from './sample';

describe('before-after', () => {
  it('renders both images, the labels and a slider that moves the divider', () => {
    const { container } = render(<BeforeAfter {...sample} />);
    expect(screen.getByAltText(sample.before.alt)).toBeInTheDocument();
    expect(screen.getByAltText(sample.after.alt)).toBeInTheDocument();
    expect(screen.getByText('Före')).toBeInTheDocument();
    expect(screen.getByText('Efter')).toBeInTheDocument();
    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('50');
    const clipped = container.querySelector('[style*="clip-path"]') as HTMLElement;
    expect(clipped.style.clipPath).toContain('50%');
    fireEvent.change(slider, { target: { value: '80' } });
    expect(slider).toHaveValue('80');
    expect(clipped.style.clipPath).toContain('20%');
  });

  it('clamps the initial position', () => {
    render(<BeforeAfter {...sample} initial={140} />);
    expect(screen.getByRole('slider')).toHaveValue('100');
  });
});
