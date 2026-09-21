import Breadcrumbs from '@/components/blocks/breadcrumbs/breadcrumbs';
import RichText from '@/components/blocks/rich-text/rich-text';
import ImageText from '@/components/blocks/image-text/image-text';
import StatsRow from '@/components/blocks/stats-row/stats-row';
import Timeline from '@/components/blocks/timeline/timeline';
import TeamGrid from '@/components/blocks/team-grid/team-grid';
import CertificationsRow from '@/components/blocks/certifications-row/certifications-row';
import GalleryLightbox from '@/components/blocks/gallery-lightbox/gallery-lightbox';
import VideoEmbed from '@/components/blocks/video-embed/video-embed';
import CtaBand from '@/components/blocks/cta-band/cta-band';
import FooterColumns from '@/components/blocks/footer-columns/footer-columns';

import { sample as richText } from '@/components/blocks/rich-text/sample';
import { sample as imageText } from '@/components/blocks/image-text/sample';
import { sample as stats } from '@/components/blocks/stats-row/sample';
import { sample as timeline } from '@/components/blocks/timeline/sample';
import { sample as team } from '@/components/blocks/team-grid/sample';
import { sample as certs } from '@/components/blocks/certifications-row/sample';
import { sample as gallery } from '@/components/blocks/gallery-lightbox/sample';
import { sample as video } from '@/components/blocks/video-embed/sample';
import { sample as cta } from '@/components/blocks/cta-band/sample';
import { sample as footer } from '@/components/blocks/footer-columns/sample';

export const metadata = { title: 'Exempel: om oss' };

/** An about page: text, story, numbers, history, people, marks, photos, film, a nudge. */
export default function ExampleAboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Om oss' }]} jsonLd={false} />
      <RichText {...richText} />
      <ImageText {...imageText} title={null} />
      <StatsRow {...stats} variant="card" />
      <Timeline {...timeline} layout="alternate" />
      <TeamGrid {...team} />
      <CertificationsRow {...certs} />
      <GalleryLightbox {...gallery} />
      <VideoEmbed {...video} width="narrow" />
      <CtaBand {...cta} />
      <FooterColumns {...footer} />
    </>
  );
}
