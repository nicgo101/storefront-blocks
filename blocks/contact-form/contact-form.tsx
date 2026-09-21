'use client';

import { useId, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export type ContactFormResult = { ok: boolean; message?: string };
export type ContactField = 'name' | 'email' | 'phone' | 'subject' | 'message';

export type ContactFormProps = {
  title?: string;
  text?: string;
  /** Receives the form data (fields named `name`, `email`, `phone`, `subject`, `message` and the honeypot `website`). Wire the site's forms action; see README. */
  action: (formData: FormData) => Promise<ContactFormResult>;
  /** Which fields to show, in order. `email` and `message` are always required. */
  fields?: ContactField[];
  buttonLabel?: string;
  /** Small print under the button. Required by GDPR: say what the details are used for. */
  consentText?: string;
  /** `card`: the form in a card. `plain`: on the page background. */
  variant?: 'card' | 'plain';
};

const LABELS: Record<ContactField, string> = { name: 'Namn', email: 'E-post', phone: 'Telefon', subject: 'Ärende', message: 'Meddelande' };

export default function ContactForm({
  title = 'Kontakta oss',
  text = 'Skriv några rader så hör vi av oss inom en arbetsdag.',
  action,
  fields = ['name', 'email', 'phone', 'message'],
  buttonLabel = 'Skicka',
  consentText = 'Vi använder uppgifterna bara för att svara på ditt meddelande.',
  variant = 'card',
}: ContactFormProps) {
  const id = useId();
  const [state, setState] = useState<{ status: 'idle' | 'sending' | 'done' | 'error'; message?: string }>({ status: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ status: 'sending' });
    try {
      const r = await action(new FormData(form));
      setState({ status: r.ok ? 'done' : 'error', message: r.message ?? (r.ok ? 'Tack! Vi hör av oss så snart vi kan.' : 'Något gick fel. Försök igen eller ring oss.') });
      if (r.ok) form.reset();
    } catch {
      setState({ status: 'error', message: 'Något gick fel. Försök igen eller ring oss.' });
    }
  }

  const shown: ContactField[] = Array.from(new Set([...fields, 'email', 'message'] as ContactField[]));
  const sending = state.status === 'sending';

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-20">
        <div className={variant === 'card' ? 'rounded-lg border border-border bg-card p-8' : ''}>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
          {text ? <p className="mt-2 text-muted-foreground">{text}</p> : null}
          {state.status === 'done' ? (
            <p role="status" aria-live="polite" className="mt-6 rounded-md bg-muted p-4 text-foreground">{state.message}</p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
              {shown.map((f) => {
                const wide = f === 'message' || f === 'subject';
                const fid = `${id}-${f}`;
                return (
                  <div key={f} className={wide ? 'sm:col-span-2' : ''}>
                    <Label htmlFor={fid}>{LABELS[f]}{f === 'email' || f === 'message' ? '' : ' (valfritt)'}</Label>
                    {f === 'message'
                      ? <Textarea id={fid} name="message" required rows={5} disabled={sending} className="mt-1" />
                      : <Input id={fid} name={f} type={f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'text'} autoComplete={f === 'email' ? 'email' : f === 'phone' ? 'tel' : f === 'name' ? 'name' : 'off'} required={f === 'email'} disabled={sending} className="mt-1" />}
                  </div>
                );
              })}
              {/* Honeypot: hidden from people, filled by bots; the site's forms plugin drops such submissions. */}
              <div className="hidden" aria-hidden="true"><label>Webbplats<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={sending}>{sending ? 'Skickar…' : buttonLabel}</Button>
                <p className="mt-2 text-xs text-muted-foreground">{consentText}</p>
                {state.status === 'error' && state.message ? <p role="status" aria-live="polite" className="mt-3 text-sm text-destructive">{state.message}</p> : null}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
