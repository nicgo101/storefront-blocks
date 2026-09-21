'use client';

import { useState, useId, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type NewsletterResult = { ok: boolean; message?: string };

export type NewsletterProps = {
  title?: string;
  text?: string;
  /** Called with the form data on submit. On the four storefronts wire the existing server action from `@/components/layout/newsletter-actions`. */
  action: (formData: FormData) => Promise<NewsletterResult>;
  buttonLabel?: string;
  /** Small print under the field. Required by GDPR: say what the address is used for. */
  consentText?: string;
  /** `band`: muted background across the page. `card`: a card in the content column. */
  variant?: 'band' | 'card';
};

export default function Newsletter({
  title = 'Nyhetsbrev',
  text = 'Tips, guider och erbjudanden ett par gånger i månaden. Avsluta när du vill.',
  action,
  buttonLabel = 'Prenumerera',
  consentText = 'Vi använder adressen bara till nyhetsbrevet.',
  variant = 'band',
}: NewsletterProps) {
  const id = useId();
  const [state, setState] = useState<{ status: 'idle' | 'sending' | 'done' | 'error'; message?: string }>({ status: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ status: 'sending' });
    try {
      const r = await action(new FormData(form));
      setState({ status: r.ok ? 'done' : 'error', message: r.message ?? (r.ok ? 'Tack! Kolla din inkorg och bekräfta.' : 'Något gick fel. Försök igen.') });
      if (r.ok) form.reset();
    } catch {
      setState({ status: 'error', message: 'Något gick fel. Försök igen.' });
    }
  }

  const inner = (
    <div className={variant === 'card' ? 'rounded-lg border border-border bg-card p-8' : ''}>
      <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      {text ? <p className="mt-2 text-muted-foreground">{text}</p> : null}
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end" noValidate>
        <div className="flex-1">
          <Label htmlFor={`${id}-email`} className="sr-only">E-postadress</Label>
          <Input id={`${id}-email`} name="email" type="email" autoComplete="email" required placeholder="din@epost.se" disabled={state.status === 'sending'} />
        </div>
        <Button type="submit" disabled={state.status === 'sending'}>{state.status === 'sending' ? 'Skickar…' : buttonLabel}</Button>
      </form>
      <p className="mt-2 text-xs text-muted-foreground">{consentText}</p>
      {state.message ? (
        <p role="status" aria-live="polite" className={state.status === 'error' ? 'mt-3 text-sm text-destructive' : 'mt-3 text-sm text-foreground'}>{state.message}</p>
      ) : null}
    </div>
  );

  return (
    <section className={variant === 'band' ? 'bg-muted' : 'bg-background'}>
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-20">{inner}</div>
    </section>
  );
}
