import { render, screen, act } from '@testing-library/react';
import RecentlyViewed from './recently-viewed';
import RecentlyViewedTracker, { readRecentlyViewed, recordViewed, RECENTLY_VIEWED_MAX } from './recently-viewed-tracker';

describe('recently-viewed', () => {
  beforeEach(() => { window.localStorage.clear(); });

  it('the tracker records, moves a repeat to the front and caps the list', () => {
    render(<RecentlyViewedTracker slug="a" name="A" preview="https://x/a.jpg" price="10 kr" />);
    recordViewed({ slug: 'b', name: 'B' });
    recordViewed({ slug: 'a', name: 'A' });
    expect(readRecentlyViewed().map((p) => p.slug)).toEqual(['a', 'b']);
    for (let i = 0; i < RECENTLY_VIEWED_MAX + 3; i++) recordViewed({ slug: `p${i}`, name: `P${i}` });
    expect(readRecentlyViewed()).toHaveLength(RECENTLY_VIEWED_MAX);
    window.localStorage.setItem('recently-viewed', '{ junk');
    expect(readRecentlyViewed()).toEqual([]);
  });

  it('the list renders nothing when empty, otherwise links built from the template, excluding the current slug', async () => {
    const empty = render(<RecentlyViewed />);
    await act(async () => { await Promise.resolve(); });
    expect(empty.container).toBeEmptyDOMElement();
    empty.unmount();
    recordViewed({ slug: 'slang', name: 'Slang', preview: 'https://x/s.jpg', price: '499 kr' });
    recordViewed({ slug: 'spade', name: 'Spade' });
    render(<RecentlyViewed excludeSlug="spade" hrefTemplate="/p/{slug}" />);
    await act(async () => { await Promise.resolve(); });
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', '/p/slang');
    expect(links[0]).toHaveTextContent('Slang');
    expect(links[0]).toHaveTextContent('499 kr');
  });
});
