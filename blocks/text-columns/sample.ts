import type { TextColumnsProps } from './text-columns';

export const sample: TextColumnsProps = {
  title: 'Tre sätt att handla',
  columns: [
    { title: 'I butiken', paragraphs: ['Storgatan 12 i Uppsala, vardagar 8 till 17 och lördagar 10 till 14. Provkör, känn och fråga.'], link: { label: 'Hitta hit', href: '/kontakt' } },
    { title: 'På webben', paragraphs: ['Hela sortimentet dygnet runt, med lagerstatus i realtid. Fri frakt över 499 kr.'], link: { label: 'Börja handla', href: '/collection' } },
    { title: 'Via telefon', paragraphs: ['Ring 018-12 34 56 så lägger vi ordern tillsammans. Bra när du är osäker på vilken del som passar.'] },
  ],
  variant: 'plain',
};
