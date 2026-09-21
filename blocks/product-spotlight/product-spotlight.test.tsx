import { render, screen } from '@testing-library/react';
import ProductSpotlight from './product-spotlight';
import { sample } from './sample';

describe('product-spotlight', () => {
  it('takes name, image and a from-price from the shop and links to the product page', async () => {
    render(await ProductSpotlight({ ...sample }));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Trädgårdsslang 25 m');
    expect(screen.getByText(sample.eyebrow!)).toBeInTheDocument();
    expect(screen.getByText(/^från/)).toHaveTextContent('499');
    expect(screen.getByRole('link', { name: sample.buttonLabel })).toHaveAttribute('href', `/produkt/${sample.slug}`);
    expect(screen.getByAltText('Trädgårdsslang 25 m')).toBeInTheDocument();
  });

  it('prefers explicit title and image, renders nothing for an unknown slug', async () => {
    render(await ProductSpotlight({ slug: 'x', title: 'Slangen', image: { src: '/uploads/s.jpg', alt: 'Slang', width: 800, height: 600 } }));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Slangen');
    expect(screen.getByAltText('Slang')).toHaveAttribute('src', '/uploads/s.jpg');
    expect(await ProductSpotlight({ slug: 'finns-inte' })).toBeNull();
  });
});
