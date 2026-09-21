import { render, screen } from '@testing-library/react';
import BrandGrid from './brand-grid';
import { sample } from './sample';
import * as commerce from '@nicgo101/storefront-commerce/api';

describe('brand-grid', () => {
  it('lists the brand facet values by count with links to the filtered search, ignoring other facets', async () => {
    render(await BrandGrid({ ...sample }));
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(6);
    expect(links[0]).toHaveTextContent('Gardena');
    expect(links[0]).toHaveTextContent('12 produkter');
    expect(links[0]).toHaveAttribute('href', '/search?facets=500');
    expect(screen.queryByText('Röd')).not.toBeInTheDocument();
  });

  it('picks and orders by names, supports a name template, and renders null when nothing matches', async () => {
    render(await BrandGrid({ names: ['fiskars', 'Gardena', 'Okänt'], hrefTemplate: '/marke/{name}', title: null }));
    const links = screen.getAllByRole('link');
    expect(links.map((l) => l.textContent)).toEqual(['Fiskars', 'Gardena']);
    expect(links[0]).toHaveAttribute('href', '/marke/Fiskars');
    expect(await BrandGrid({ facet: 'finns-inte' })).toBeNull();
    const spy = vi.spyOn(commerce, 'query').mockRejectedValueOnce(new Error('down'));
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(await BrandGrid({})).toBeNull();
    spy.mockRestore(); err.mockRestore();
  });
});
