import type { TestimonialsProps } from './testimonials';

export const sample: TestimonialsProps = {
  title: 'Vad kunderna säger',
  text: 'Betyg och citat från riktiga beställningar.',
  items: [
    { quote: 'Snabb leverans och precis rätt del till min maskin. Ringde och fick hjälp på två minuter.', name: 'Anna L.', role: 'Uppsala', rating: 5 },
    { quote: 'Bra priser och tydliga beskrivningar. Har handlat tre gånger nu.', name: 'Per H.', role: 'Göteborg', rating: 5 },
    { quote: 'Returen gick smidigt när jag beställt fel storlek. Pengarna tillbaka samma vecka.', name: 'Maria S.', role: 'Malmö', rating: 4 },
    { quote: 'Fick tips om en billigare variant som passade lika bra. Det är service.', name: 'Johan E.', role: 'Luleå', rating: 5 },
  ],
};
