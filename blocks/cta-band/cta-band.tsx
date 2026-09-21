import Link from 'next/link';
import { Button } from '@/components/ui/button';

export type CtaBandProps = {
  title: string;
  text?: string;
  button: { label: string; href: string };
  /** `primary`: brand-coloured band with light text. `muted`: soft background, normal text. */
  tone?: 'primary' | 'muted';
};

export default function CtaBand({
  title = 'Osäker på vad som passar?',
  text = 'Ring oss så hjälper vi dig välja rätt, vardagar 8 till 17.',
  button = { label: 'Kontakta oss', href: '/kontakt' },
  tone = 'primary',
}: CtaBandProps) {
  const primary = tone === 'primary';
  return (
    <section className={primary ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}>
      <div className="mx-auto flex max-w-[80rem] flex-col items-start gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:py-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          {text ? <p className={primary ? 'mt-2 text-primary-foreground/80' : 'mt-2 text-muted-foreground'}>{text}</p> : null}
        </div>
        <Button asChild size="lg" variant={primary ? 'secondary' : 'default'} className="shrink-0">
          <Link href={button.href}>{button.label}</Link>
        </Button>
      </div>
    </section>
  );
}
