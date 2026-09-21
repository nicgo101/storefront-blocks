import { render, screen, fireEvent, act } from '@testing-library/react';
import StickyCta, { toTelHref } from './sticky-cta';
import { sample } from './sample';

describe('sticky-cta', () => {
  it('renders a visible tel link with icon and label', () => {
    render(<StickyCta {...sample} />);
    const a = screen.getByRole('link', { name: sample.label });
    expect(a).toHaveAttribute('href', sample.href);
    expect(a.className).toContain('opacity-100');
    expect(a.className).not.toContain('md:hidden');
  });

  it('is hidden until scrolled past showAfter, and mobile-only by default', () => {
    render(<StickyCta label="Boka" href="/boka" icon="calendar" showAfter={300} />);
    const a = screen.getByRole('link', { hidden: true });
    expect(a.className).toContain('opacity-0');
    expect(a.className).toContain('md:hidden');
    expect(a).toHaveAttribute('tabindex', '-1');
    act(() => { Object.defineProperty(window, 'scrollY', { value: 400, configurable: true }); fireEvent.scroll(window); });
    expect(a.className).toContain('opacity-100');
    expect(a).toHaveAttribute('tabindex', '0');
  });

  it('derives tel hrefs the Swedish way', () => {
    expect(toTelHref('018-12 34 56')).toBe('tel:+4618123456');
  });
});
