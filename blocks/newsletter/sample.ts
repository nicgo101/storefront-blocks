import type { NewsletterProps } from './newsletter';

export const sample: NewsletterProps = {
  title: 'Nyhetsbrev',
  text: 'Tips, guider och erbjudanden ett par gånger i månaden. Avsluta när du vill.',
  action: async (formData) => {
    const email = String(formData.get('email') ?? '');
    return email.includes('@') ? { ok: true, message: 'Tack! Kolla din inkorg och bekräfta.' } : { ok: false, message: 'Ange en giltig e-postadress.' };
  },
  buttonLabel: 'Prenumerera',
  consentText: 'Vi använder adressen bara till nyhetsbrevet.',
  variant: 'band',
};
