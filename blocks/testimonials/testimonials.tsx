'use client';

import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export type TestimonialsProps = {
  title?: string | null;
  text?: string;
  items: { quote: string; name: string; role?: string; rating?: 1 | 2 | 3 | 4 | 5 }[];
};

const DEFAULT_ITEMS: TestimonialsProps['items'] = [
  { quote: 'Snabb leverans och precis rätt del till min maskin. Ringde och fick hjälp på två minuter.', name: 'Anna L.', role: 'Uppsala', rating: 5 },
  { quote: 'Bra priser och tydliga beskrivningar. Har handlat tre gånger nu.', name: 'Per H.', role: 'Göteborg', rating: 5 },
  { quote: 'Returen gick smidigt när jag beställt fel storlek. Pengarna tillbaka samma vecka.', name: 'Maria S.', role: 'Malmö', rating: 4 },
];

export default function Testimonials({ title = 'Vad kunderna säger', text, items = DEFAULT_ITEMS }: TestimonialsProps) {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <Carousel opts={{ align: 'start', loop: items.length > 3 }} className={title || text ? 'mt-10' : ''}>
          <CarouselContent>
            {items.map((t, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    {t.rating ? <Stars n={t.rating} /> : null}
                    <blockquote className="flex-1 text-foreground">“{t.quote}”</blockquote>
                    <footer className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{t.name}</span>
                      {t.role ? <span>, {t.role}</span> : null}
                    </footer>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          {items.length > 3 ? <><CarouselPrevious className="hidden md:inline-flex" /><CarouselNext className="hidden md:inline-flex" /></> : null}
        </Carousel>
      </div>
    </section>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5 text-primary" role="img" aria-label={`${n} av 5 stjärnor`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={i < n ? 'size-4 fill-current' : 'size-4 text-muted-foreground/40'} aria-hidden="true" />
      ))}
    </span>
  );
}
