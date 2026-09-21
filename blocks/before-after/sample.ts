import type { BeforeAfterProps } from './before-after';

export const sample: BeforeAfterProps = {
  title: 'Före och efter rengöring',
  text: 'Samma pump, en timme i verkstaden. Dra i reglaget.',
  before: { src: 'https://picsum.photos/seed/before-1/1600/900?grayscale', alt: 'Pumpen före rengöring', width: 1600, height: 900 },
  after: { src: 'https://picsum.photos/seed/before-1/1600/900', alt: 'Pumpen efter rengöring', width: 1600, height: 900 },
  beforeLabel: 'Före',
  afterLabel: 'Efter',
  initial: 50,
  width: 'wide',
};
