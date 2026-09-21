import { render, screen } from '@testing-library/react';
import CategoryTiles from './category-tiles';
import { sample } from './sample';

describe('category-tiles', () => {
  it('renders the chosen collections in order with links and images from the shop', async () => {
    render(await CategoryTiles({ ...sample }));
    const links = screen.getAllByRole('link');
    expect(links.map((l) => l.getAttribute('href'))).toEqual(['/collection/odling', '/collection/verktyg', '/collection/bevattning']);
    expect(links[0]).toHaveTextContent('Odling');
    expect(links[0].querySelector('img')?.getAttribute('src')).toContain('odling');
    expect(links[2].querySelector('img')).toBeNull(); // no featured asset in the mock
  });

  it('shows every top-level collection without slugs, and nothing for unknown slugs', async () => {
    render(await CategoryTiles({ style: 'below' }));
    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(await CategoryTiles({ slugs: ['finns-inte'] })).toBeNull();
  });
});
