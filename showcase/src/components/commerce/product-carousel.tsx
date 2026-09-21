'use client';

/**
 * Showcase stand-in for the storefronts' `@/components/commerce/product-carousel`
 * (same exported name and props). See product-card.tsx for the rule.
 */
import { ProductCard } from '@/components/commerce/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { FragmentOf } from '@nicgo101/storefront-commerce/graphql';
import { ProductCardFragment } from '@nicgo101/storefront-commerce/fragments';
import { useId, type ReactNode } from 'react';

interface ProductCarouselProps {
  title: ReactNode;
  products: Array<FragmentOf<typeof ProductCardFragment>>;
  variant?: 'default' | 'inverted';
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const id = useId();
  return (
    <section className="py-12 md:py-16" aria-labelledby={id}>
      <div className="mx-auto max-w-[80rem] px-6">
        <h2 id={id} className="mb-8 text-3xl font-bold md:text-4xl">{title}</h2>
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselContent>
            {products.map((p, i) => (
              <CarouselItem key={i} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ProductCard product={p} index={i} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
