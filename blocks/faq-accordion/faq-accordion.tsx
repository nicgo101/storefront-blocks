import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export type FaqAccordionProps = {
  /** Section heading. Default "Vanliga frågor"; pass `null` when the page already has one above the block. */
  title?: string | null;
  /** Intro under the heading. */
  text?: string;
  items: { q: string; a: string }[];
  /** `single`: one open at a time (default). `multiple`: any number. */
  type?: 'single' | 'multiple';
  /** Width of the column; `narrow` (~48rem) reads best for long answers. */
  width?: 'narrow' | 'wide';
};

const DEFAULT_ITEMS: FaqAccordionProps['items'] = [
  { q: 'Hur lång är leveranstiden?', a: 'Lagervaror skickas samma dag om du beställer före 14. Leverans tar 1 till 3 vardagar.' },
  { q: 'Kan jag ångra mitt köp?', a: 'Ja, du har 30 dagars öppet köp. Returen är kostnadsfri om varan är obruten.' },
  { q: 'Hur betalar jag?', a: 'Kort, Swish eller faktura via Qliro. Du väljer i kassan.' },
];

export default function FaqAccordion({ title = 'Vanliga frågor', text, items = DEFAULT_ITEMS, type = 'single', width = 'narrow' }: FaqAccordionProps) {
  const inner = items.map((item, i) => (
    <AccordionItem key={i} value={`item-${i}`}>
      <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
      <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
    </AccordionItem>
  ));
  return (
    <section className="bg-background">
      <div className={width === 'narrow' ? 'mx-auto max-w-3xl px-6 py-16 md:py-20' : 'mx-auto max-w-[80rem] px-6 py-16 md:py-20'}>
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 text-muted-foreground">{text}</p> : null}
        <div className={title || text ? 'mt-8' : ''}>
          {type === 'multiple'
            ? <Accordion type="multiple">{inner}</Accordion>
            : <Accordion type="single" collapsible>{inner}</Accordion>}
        </div>
      </div>
    </section>
  );
}
