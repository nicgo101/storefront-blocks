import { render, screen, act } from '@testing-library/react';
import CountdownBand from './countdown-band';
import { sample } from './sample';

describe('countdown-band', () => {
  afterEach(() => { vi.useRealTimers(); });

  it('shows the countdown and the link while time remains', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-21T10:00:00Z'));
    const { container } = render(<CountdownBand {...sample} endsAt="2026-09-22T11:05:09Z" />);
    await act(async () => { await Promise.resolve(); });
    expect(screen.getByText(sample.title)).toBeInTheDocument();
    const text = container.textContent!.replace(/\s+/g, ' ');
    expect(text).toContain('01dagar');
    expect(text).toContain('01tim');
    expect(text).toContain('05min');
    expect(text).toContain('09sek');
    expect(screen.getByRole('link', { name: sample.link!.label })).toHaveAttribute('href', sample.link!.href);
  });

  it('renders nothing once the date has passed', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-21T10:00:00Z'));
    const { container } = render(<CountdownBand {...sample} endsAt="2026-09-20T00:00:00Z" />);
    await act(async () => { await Promise.resolve(); });
    expect(container).toBeEmptyDOMElement();
  });
});
