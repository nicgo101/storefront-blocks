import { render, screen, fireEvent } from '@testing-library/react';
import AnnouncementBar from './announcement-bar';
import { sample } from './sample';

describe('announcement-bar', () => {
  beforeEach(() => { window.localStorage.clear(); });

  it('renders text and link, and dismisses with a remembered id', () => {
    render(<AnnouncementBar {...sample} />);
    expect(screen.getByRole('region', { name: 'Meddelande' })).toHaveTextContent(sample.text);
    expect(screen.getByRole('link', { name: sample.link!.label })).toHaveAttribute('href', sample.link!.href);
    fireEvent.click(screen.getByRole('button', { name: 'Stäng meddelandet' }));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('announcement-bar-dismissed')).toBe(sample.id);
  });

  it('stays hidden for the same id and shows again for a new one', () => {
    window.localStorage.setItem('announcement-bar-dismissed', sample.id!);
    const { unmount } = render(<AnnouncementBar {...sample} />);
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    unmount();
    render(<AnnouncementBar {...sample} id="ny" />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('has no close button when not dismissible', () => {
    render(<AnnouncementBar text="Hej" dismissible={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
