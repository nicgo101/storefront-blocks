'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export type GalleryImage = { src: string; alt: string; width: number; height: number };

export type GalleryLightboxProps = {
  title?: string | null;
  images: GalleryImage[];
  /** Grid columns from `md`; phones always show 2. */
  columns?: 2 | 3 | 4;
  /** `square` crops thumbnails to squares; `natural` keeps each image's ratio in a masonry-like row. */
  thumbs?: 'square' | 'natural';
};

const COLS: Record<number, string> = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

export default function GalleryLightbox({ title = null, images, columns = 3, thumbs = 'square' }: GalleryLightboxProps) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    return () => { api.off('select', onSelect); };
  }, [api]);

  const openAt = useCallback((i: number) => { setStart(i); setCurrent(i); setOpen(true); }, []);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        <ul className={cn('grid grid-cols-2 gap-3', COLS[columns])}>
          {images.map((img, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => openAt(i)}
                aria-label={`Visa bild ${i + 1} av ${images.length}${img.alt ? `: ${img.alt}` : ''}`}
                className={cn('group block w-full overflow-hidden rounded-lg bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', thumbs === 'square' && 'aspect-square')}
              >
                <Image src={img.src} alt="" width={img.width} height={img.height} sizes="(min-width: 768px) 33vw, 50vw" className={cn('h-full w-full transition group-hover:scale-[1.03]', thumbs === 'square' ? 'object-cover' : 'h-auto object-contain')} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(96vw,80rem)] border-0 bg-background/95 p-2 sm:p-4" showCloseButton>
          <DialogTitle className="sr-only">{title ?? 'Bildgalleri'}</DialogTitle>
          {open ? (
            <Carousel setApi={setApi} opts={{ startIndex: start, loop: images.length > 1 }} className="w-full">
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i} className="flex items-center justify-center">
                    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="96vw" className="max-h-[85vh] w-auto max-w-full object-contain" priority={i === start} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 ? (
                <>
                  <CarouselPrevious className="left-2" aria-label="Föregående bild" />
                  <CarouselNext className="right-2" aria-label="Nästa bild" />
                </>
              ) : null}
            </Carousel>
          ) : null}
          <p className="mt-2 text-center text-sm text-muted-foreground" aria-live="polite">
            {current + 1} / {images.length}{images[current]?.alt ? <span className="ml-2 text-foreground">{images[current].alt}</span> : null}
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
