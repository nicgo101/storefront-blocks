'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

export type VideoEmbedProps = {
  title?: string | null;
  text?: string;
  provider: 'youtube' | 'vimeo';
  /** The video id: YouTube `dQw4w9WgXcQ`, Vimeo `76979871`. */
  videoId: string;
  /** Accessible name of the video, shown as the play button's label. */
  videoTitle: string;
  /** Poster shown before the click; without one the provider's thumbnail is used for YouTube, a muted panel for Vimeo. */
  poster?: { src: string; alt: string; width: number; height: number };
  /** Column width. `narrow` (~48rem) for a talking head, `wide` for product films. */
  width?: 'narrow' | 'wide';
};

function embedUrl(provider: VideoEmbedProps['provider'], id: string) {
  return provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1&dnt=1`;
}

export default function VideoEmbed({ title = null, text, provider, videoId, videoTitle, poster, width = 'wide' }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const fallback = provider === 'youtube' ? { src: `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`, alt: '', width: 480, height: 360 } : null;
  const img = poster ?? fallback;
  return (
    <section className="bg-background">
      <div className={width === 'narrow' ? 'mx-auto max-w-3xl px-6 py-16 md:py-20' : 'mx-auto max-w-[80rem] px-6 py-16 md:py-20'}>
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <div className={`relative aspect-video overflow-hidden rounded-lg bg-muted ${title || text ? 'mt-8' : ''}`}>
          {playing ? (
            <iframe src={embedUrl(provider, videoId)} title={videoTitle} className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} aria-label={`Spela upp: ${videoTitle}`} className="group absolute inset-0 flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {img ? <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1280px) 80rem, 100vw" className="absolute inset-0 h-full w-full object-cover" /> : null}
              <span className="relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition group-hover:scale-105" aria-hidden="true">
                <Play className="ml-1 size-7 fill-current" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
