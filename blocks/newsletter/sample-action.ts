'use server';

/** Showcase/test stand-in for the site's newsletter server action. Not copied to sites. */
export async function sampleNewsletterAction(formData: FormData): Promise<{ ok: boolean; message?: string }> {
  const email = String(formData.get('email') ?? '');
  return email.includes('@') ? { ok: true, message: 'Tack! Kolla din inkorg och bekräfta.' } : { ok: false, message: 'Ange en giltig e-postadress.' };
}
