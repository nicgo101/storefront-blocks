import Breadcrumbs from '@/components/blocks/breadcrumbs/breadcrumbs';
import ContactMap from '@/components/blocks/contact-map/contact-map';
import ContactForm from '@/components/blocks/contact-form/contact-form';
import StoreLocations from '@/components/blocks/store-locations/store-locations';
import TabsContentBlock from '@/components/blocks/tabs-content/tabs-content';
import DownloadList from '@/components/blocks/download-list/download-list';
import StickyCta from '@/components/blocks/sticky-cta/sticky-cta';
import FooterColumns from '@/components/blocks/footer-columns/footer-columns';

import { sample as contactMap } from '@/components/blocks/contact-map/sample';
import { sample as contactForm } from '@/components/blocks/contact-form/sample';
import { sample as stores } from '@/components/blocks/store-locations/sample';
import { sample as tabs } from '@/components/blocks/tabs-content/sample';
import { sample as downloads } from '@/components/blocks/download-list/sample';
import { sample as footer } from '@/components/blocks/footer-columns/sample';

export const metadata = { title: 'Exempel: kontakt' };

/** A contact page: map and details, a form, the other stores, practical info, documents, a call button on phones. */
export default function ExampleContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Kontakt' }]} jsonLd={false} />
      <ContactMap {...contactMap} />
      <ContactForm {...contactForm} variant="plain" />
      <StoreLocations {...stores} title="Fler ställen att hitta oss" />
      <TabsContentBlock {...tabs} />
      <DownloadList {...downloads} layout="grid" />
      <StickyCta label="Ring oss" href="tel:+4618123456" icon="phone" on="mobile" />
      <FooterColumns {...footer} />
    </>
  );
}
