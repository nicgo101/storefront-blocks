import type { StepsProps } from './steps';

export const sample: StepsProps = {
  title: 'Så funkar det',
  text: 'Från första klick till leverans på tre steg.',
  steps: [
    { title: 'Välj', text: 'Hitta rätt produkt med våra guider eller ring oss.' },
    { title: 'Beställ', text: 'Betala med kort, Swish eller faktura i kassan.' },
    { title: 'Ta emot', text: 'Leverans till dörren på 1 till 3 vardagar.' },
  ],
  layout: 'row',
};
