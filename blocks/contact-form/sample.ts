import type { ContactFormProps } from './contact-form';
import { sampleContactAction } from './sample-action';

export const sample: ContactFormProps = {
  title: 'Kontakta oss',
  text: 'Skriv några rader så hör vi av oss inom en arbetsdag. Brådskande? Ring 018-12 34 56.',
  action: sampleContactAction,
  fields: ['name', 'email', 'phone', 'message'],
  buttonLabel: 'Skicka',
  consentText: 'Vi använder uppgifterna bara för att svara på ditt meddelande.',
  variant: 'card',
};
