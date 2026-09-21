import { Truck, ShieldCheck, Headset, RotateCcw, Leaf, Star, Clock, CreditCard, Package, ThumbsUp, type LucideIcon } from 'lucide-react';

/** Icons the owner can name in props. Add here, never import dynamically. */
export const USP_ICONS = { truck: Truck, shield: ShieldCheck, headset: Headset, returns: RotateCcw, leaf: Leaf, star: Star, clock: Clock, card: CreditCard, package: Package, thumbs: ThumbsUp } satisfies Record<string, LucideIcon>;

export type UspIcon = keyof typeof USP_ICONS;

export type UspRowProps = {
  /** Three or four items read best; the row wraps on phones. */
  items: { icon: UspIcon; title: string; text?: string }[];
  /** `band`: muted background across the page. `plain`: no background. */
  variant?: 'band' | 'plain';
};

const DEFAULT_ITEMS: UspRowProps['items'] = [
  { icon: 'truck', title: 'Fri frakt över 499 kr', text: 'Leverans på 1 till 3 vardagar.' },
  { icon: 'returns', title: '30 dagars öppet köp', text: 'Ångra dig i lugn och ro.' },
  { icon: 'headset', title: 'Rådgivning på telefon', text: 'Vardagar 8 till 17.' },
  { icon: 'shield', title: 'Trygg betalning', text: 'Kort, Swish och faktura.' },
];

export default function UspRow({ items = DEFAULT_ITEMS, variant = 'band' }: UspRowProps) {
  return (
    <section className={variant === 'band' ? 'bg-muted' : 'bg-background'}>
      <ul className="mx-auto grid max-w-[80rem] grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:py-10">
        {items.map((item, i) => {
          const Icon = USP_ICONS[item.icon] ?? Star;
          return (
            <li key={i} className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background text-primary" aria-hidden="true">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-medium leading-snug text-foreground">{item.title}</p>
                {item.text ? <p className="mt-0.5 text-sm text-muted-foreground">{item.text}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
