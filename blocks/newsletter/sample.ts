import type { NewsletterProps } from './newsletter';
import { sampleNewsletterAction } from './sample-action';

export const sample: NewsletterProps = {
  title: 'Nyhetsbrev',
  text: 'Tips, guider och erbjudanden ett par gånger i månaden. Avsluta när du vill.',
  action: sampleNewsletterAction,
  buttonLabel: 'Prenumerera',
  consentText: 'Vi använder adressen bara till nyhetsbrevet.',
  variant: 'band',
};
