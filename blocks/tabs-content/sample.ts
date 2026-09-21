import type { TabsContentProps } from './tabs-content';

export const sample: TabsContentProps = {
  title: 'Bra att veta',
  tabs: [
    { id: 'leverans', label: 'Leverans', paragraphs: ['Lagervaror skickas samma dag om du beställer före 14. Leverans tar 1 till 3 vardagar med PostNord eller DHL.', 'Skrymmande gods körs med hemleverans. Vi ringer och bokar tid.'] },
    { id: 'retur', label: 'Returer', paragraphs: ['Du har 30 dagars öppet köp. Returen är kostnadsfri om varan är obruten och i originalförpackning.', 'Skriv ut returetiketten från orderbekräftelsen eller be oss mejla en.'] },
    { id: 'garanti', label: 'Garanti', paragraphs: ['Två års garanti på alla maskiner, ett år på förbrukningsdelar. Garantin gäller fel i material och tillverkning.'] },
    { id: 'betalning', label: 'Betalning', paragraphs: ['Kort, Swish eller faktura via Qliro. Företag kan ansöka om fakturakonto med 30 dagars betalningstid.'] },
  ],
  width: 'narrow',
};
