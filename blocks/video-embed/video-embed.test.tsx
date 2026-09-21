import { render, screen, fireEvent } from '@testing-library/react';
import VideoEmbed from './video-embed';
import { sample } from './sample';

describe('video-embed', () => {
  it('shows the poster and no iframe until play, then a nocookie YouTube embed', () => {
    const { container } = render(<VideoEmbed {...sample} />);
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.getByAltText(sample.poster!.alt)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: `Spela upp: ${sample.videoTitle}` }));
    const iframe = container.querySelector('iframe')!;
    expect(iframe).toHaveAttribute('title', sample.videoTitle);
    expect(iframe.getAttribute('src')).toBe(`https://www.youtube-nocookie.com/embed/${sample.videoId}?autoplay=1&rel=0`);
  });

  it('uses the Vimeo player with dnt and no poster fallback', () => {
    const { container } = render(<VideoEmbed provider="vimeo" videoId="76979871" videoTitle="Film" />);
    expect(container.querySelector('img')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Spela upp: Film' }));
    expect(container.querySelector('iframe')?.getAttribute('src')).toBe('https://player.vimeo.com/video/76979871?autoplay=1&dnt=1');
  });
});
