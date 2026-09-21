'use server';

/** Showcase/test stand-in for the site's forms action. Not copied to sites. */
export async function sampleContactAction(formData: FormData): Promise<{ ok: boolean; message?: string }> {
  const email = String(formData.get('email') ?? '');
  const message = String(formData.get('message') ?? '');
  if (String(formData.get('website') ?? '')) return { ok: true, message: 'Tack!' };
  if (!email.includes('@')) return { ok: false, message: 'Ange en giltig e-postadress.' };
  if (message.trim().length < 5) return { ok: false, message: 'Skriv några ord i meddelandet.' };
  return { ok: true, message: 'Tack! Vi hör av oss inom en arbetsdag.' };
}
