import { render, screen } from '@testing-library/react';
import CollectionBanner from './collection-banner';
import { sample } from './sample';

describe('collection-banner', () => {
  it('takes name and image from the shop and links to the collection', async () => {
    render(await CollectionBanner({ ...sample }));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Odling');
    expect(screen.getByRole('link', { name: sample.buttonLabel })).toHaveAttribute('href', '/collection/odling');
    expect(document.querySelector('img')?.getAttribute('src')).toContain('odling');
  });

  it('prefers explicit title and image, card layout', async () => {
    render(await CollectionBanner({ slug: 'bevattning', title: 'Vatten', image: { src: '/uploads/w.jpg', alt: 'Slang', width: 800, height: 600 }, layout: 'card' }));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Vatten');
    expect(screen.getByAltText('Slang')).toHaveAttribute('src', '/uploads/w.jpg');
  });

  it('renders nothing for an unknown slug without a title', async () => {
    expect(await CollectionBanner({ slug: 'finns-inte' })).toBeNull();
  });
});
