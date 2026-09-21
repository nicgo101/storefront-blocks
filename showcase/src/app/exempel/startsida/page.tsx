import AnnouncementBar from '@/components/blocks/announcement-bar/announcement-bar';
import HeroImage from '@/components/blocks/hero-image/hero-image';
import UspRow from '@/components/blocks/usp-row/usp-row';
import PromoTiles from '@/components/blocks/promo-tiles/promo-tiles';
import CategoryTiles from '@/components/blocks/category-tiles/category-tiles';
import ProductTabsCollections from '@/components/blocks/product-tabs-collections/product-tabs-collections';
import FeatureHighlight from '@/components/blocks/feature-highlight/feature-highlight';
import ReviewSummary from '@/components/blocks/review-summary/review-summary';
import Testimonials from '@/components/blocks/testimonials/testimonials';
import ProductSpotlight from '@/components/blocks/product-spotlight/product-spotlight';
import BrandGrid from '@/components/blocks/brand-grid/brand-grid';
import FaqAccordion from '@/components/blocks/faq-accordion/faq-accordion';
import Newsletter from '@/components/blocks/newsletter/newsletter';
import FooterColumns from '@/components/blocks/footer-columns/footer-columns';

import { sample as hero } from '@/components/blocks/hero-image/sample';
import { sample as usp } from '@/components/blocks/usp-row/sample';
import { sample as promo } from '@/components/blocks/promo-tiles/sample';
import { sample as feature } from '@/components/blocks/feature-highlight/sample';
import { sample as testimonials } from '@/components/blocks/testimonials/sample';
import { sample as faq } from '@/components/blocks/faq-accordion/sample';
import { sample as newsletter } from '@/components/blocks/newsletter/sample';
import { sample as footer } from '@/components/blocks/footer-columns/sample';

export const metadata = { title: 'Exempel: startsida' };

/**
 * A whole shop start page made of blocks only. Every section is one block with
 * its sample props (a few overridden), in the order a webmaster would stack them.
 */
export default function ExampleStartPage() {
  return (
    <>
      <AnnouncementBar text="Fri frakt på alla beställningar över 499 kr fram till söndag." link={{ label: 'Läs mer', href: '/fraktvillkor' }} id="exempel-fri-frakt" />
      <HeroImage {...hero} />
      <UspRow {...usp} />
      <PromoTiles {...promo} />
      <CategoryTiles title="Handla efter kategori" slugs={['odling', 'verktyg', 'bevattning']} columns={3} />
      <ProductTabsCollections title="Just nu" tabs={[{ label: 'Nyheter', slug: 'nyheter' }, { label: 'Kampanj', slug: 'kampanj' }, { label: 'Bästsäljare', slug: 'populara-produkter' }]} take={8} />
      <FeatureHighlight {...feature} imageSide="right" />
      <ReviewSummary rating={4.7} count={1284} source="från våra kunder" href="/omdomen" />
      <Testimonials {...testimonials} />
      <ProductSpotlight slug="tradgardsslang-25-m" eyebrow="Månadens produkt" text="Knickfri, 25 meter och tål att ligga ute hela säsongen. Passar alla vanliga kopplingar." />
      <BrandGrid title="Märken vi säljer" take={8} columns={4} />
      <FaqAccordion {...faq} title="Vanliga frågor" />
      <Newsletter {...newsletter} />
      <FooterColumns {...footer} />
    </>
  );
}
