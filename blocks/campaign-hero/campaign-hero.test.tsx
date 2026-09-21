import { render, screen, act } from '@testing-library/react';
import CampaignHero from './campaign-hero';
import CampaignCountdown from './campaign-countdown';
import { sample } from './sample';

describe('campaign-hero', () => {
  it('renders eyebrow, heading, text, image from the shop and the button', async () => {
    render(await CampaignHero({ ...sample }));
    expect(screen.getByText(sample.eyebrow!)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(sample.title!);
    expect(document.querySelector('img')?.getAttribute('src')).toContain('odling');
    expect(screen.getByRole('link', { name: sample.buttonLabel })).toHaveAttribute('href', '/collection/odling');
  });

  it('takes the collection name when no title is given and renders null for an unknown slug', async () => {
    render(await CampaignHero({ slug: 'verktyg' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Verktyg');
    expect(await CampaignHero({ slug: 'finns-inte' })).toBeNull();
  });
});

describe('campaign-countdown', () => {
  it('shows days, hours and minutes while time remains, nothing once passed', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-21T10:00:00Z'));
    const { unmount, container } = render(<CampaignCountdown endsAt="2026-09-23T12:30:00Z" />);
    await act(async () => { await Promise.resolve(); });
    const text = container.querySelector('p')!.textContent!.replace(/\s+/g, ' ');
    expect(text).toContain('2 dagar');
    expect(text).toContain('2 tim');
    expect(text).toContain('30 min');
    unmount();
    render(<CampaignCountdown endsAt="2026-09-20T00:00:00Z" />);
    await act(async () => { await Promise.resolve(); });
    expect(screen.queryByText(/dagar/)).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
