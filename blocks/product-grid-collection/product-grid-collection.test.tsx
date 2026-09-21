import { render, screen } from '@testing-library/react';
import ProductGridCollection from './product-grid-collection';
import { sample } from './sample';
import * as commerce from '@nicgo101/storefront-commerce/api';

describe('product-grid-collection', () => {
  it('renders one product card per search item and the more-link', async () => {
    render(await ProductGridCollection({ ...sample }));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(sample.title!);
    expect(screen.getAllByRole('listitem')).toHaveLength(sample.take!);
    expect(screen.getByRole('link', { name: sample.moreLabel })).toHaveAttribute('href', `/collection/${sample.slug}`);
  });

  it('renders nothing when the query fails', async () => {
    const spy = vi.spyOn(commerce, 'query').mockRejectedValueOnce(new Error('down'));
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    const el = await ProductGridCollection({ slug: 'nope' });
    expect(el).toBeNull();
    spy.mockRestore(); err.mockRestore();
  });

  it('hides the more-link with moreHref null', async () => {
    render(await ProductGridCollection({ ...sample, moreHref: null }));
    expect(screen.queryByRole('link', { name: sample.moreLabel })).not.toBeInTheDocument();
  });
});
