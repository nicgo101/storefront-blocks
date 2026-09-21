import { render, screen } from '@testing-library/react';
import ProductCarouselCollection from './product-carousel-collection';
import { sample } from './sample';
import * as commerce from '@nicgo101/storefront-commerce/api';

describe('product-carousel-collection', () => {
  it('renders the site carousel with the heading and products', async () => {
    render(await ProductCarouselCollection({ ...sample }));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(sample.title);
    expect(screen.getAllByRole('article')).toHaveLength(sample.take!);
  });

  it('renders nothing when the query fails', async () => {
    const spy = vi.spyOn(commerce, 'query').mockRejectedValueOnce(new Error('down'));
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(await ProductCarouselCollection({ slug: 'nope', title: 'X' })).toBeNull();
    spy.mockRestore(); err.mockRestore();
  });
});
