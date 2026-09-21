import { render, screen, fireEvent } from '@testing-library/react';
import ProductTabsCollections from './product-tabs-collections';
import { sample } from './sample';
import * as commerce from '@nicgo101/storefront-commerce/api';

describe('product-tabs-collections', () => {
  it('renders one tab per collection with a grid and a more-link, switching on click', async () => {
    render(await ProductTabsCollections({ ...sample }));
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((t) => t.textContent)).toEqual(sample.tabs.map((t) => t.label));
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(sample.take!);
    expect(screen.getByRole('link', { name: sample.moreLabel! })).toHaveAttribute('href', '/collection/nyheter');
    fireEvent.mouseDown(tabs[1]);
    fireEvent.click(tabs[1]);
    expect(screen.getByRole('link', { name: sample.moreLabel! })).toHaveAttribute('href', '/collection/kampanj');
  });

  it('drops tabs that return nothing and renders null when all are empty', async () => {
    const spy = vi.spyOn(commerce, 'query').mockResolvedValue({ data: { search: { items: [], totalItems: 0 } } } as never);
    expect(await ProductTabsCollections({ tabs: sample.tabs })).toBeNull();
    spy.mockRestore();
  });
});
