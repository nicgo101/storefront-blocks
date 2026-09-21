export type StepsProps = {
  title?: string;
  text?: string;
  /** Three or four steps read best. */
  steps: { title: string; text: string }[];
  /** `row`: side by side from md. `list`: always stacked with a left rail. */
  layout?: 'row' | 'list';
};

const DEFAULT_STEPS: StepsProps['steps'] = [
  { title: 'Välj', text: 'Hitta rätt produkt med våra guider eller ring oss.' },
  { title: 'Beställ', text: 'Betala med kort, Swish eller faktura i kassan.' },
  { title: 'Ta emot', text: 'Leverans till dörren på 1 till 3 vardagar.' },
];

export default function Steps({ title = 'Så funkar det', text, steps = DEFAULT_STEPS, layout = 'row' }: StepsProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[80rem] px-6 py-16 md:py-20">
        {title ? <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2> : null}
        {text ? <p className="mt-2 max-w-2xl text-muted-foreground">{text}</p> : null}
        <ol className={layout === 'row' ? 'mt-10 grid gap-8 md:grid-cols-3' : 'mt-10 flex flex-col gap-8'}>
          {steps.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground" aria-hidden="true">{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
