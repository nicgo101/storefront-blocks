import type { FaqAccordionProps } from './faq-accordion';

export const sample: FaqAccordionProps = {
  title: 'Vanliga frågor',
  text: 'Hittar du inte svaret? Ring oss på vardagar 8 till 17.',
  items: [
    { q: 'Hur lång är leveranstiden?', a: 'Lagervaror skickas samma dag om du beställer före 14. Leverans tar 1 till 3 vardagar.' },
    { q: 'Kan jag ångra mitt köp?', a: 'Ja, du har 30 dagars öppet köp. Returen är kostnadsfri om varan är obruten.' },
    { q: 'Hur betalar jag?', a: 'Kort, Swish eller faktura via Qliro. Du väljer i kassan.' },
    { q: 'Levererar ni till hela Sverige?', a: 'Ja, även till öar med färja. Skrymmande gods körs med hemleverans.' },
  ],
  type: 'single',
  width: 'narrow',
};
