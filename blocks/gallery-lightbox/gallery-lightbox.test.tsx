import { render, screen, fireEvent } from '@testing-library/react';
import GalleryLightbox from './gallery-lightbox';
import { sample } from './sample';

describe('gallery-lightbox', () => {
  it('renders one labelled button per image and no dialog until a click', () => {
    render(<GalleryLightbox {...sample} />);
    expect(screen.getAllByRole('button', { name: /^Visa bild/ })).toHaveLength(sample.images.length);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the lightbox at the clicked image with a counter and caption', () => {
    render(<GalleryLightbox {...sample} />);
    fireEvent.click(screen.getByRole('button', { name: `Visa bild 3 av ${sample.images.length}: ${sample.images[2].alt}` }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(`3 / ${sample.images.length}`);
    expect(dialog).toHaveTextContent(sample.images[2].alt);
    expect(screen.getByRole('button', { name: 'Nästa bild' })).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('maps columns to a literal class', () => {
    const { container } = render(<GalleryLightbox {...sample} columns={4} />);
    expect(container.querySelector('ul')?.className).toContain('md:grid-cols-4');
  });
});
