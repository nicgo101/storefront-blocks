import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './contact-form';
import { sample } from './sample';

describe('contact-form', () => {
  it('renders the chosen fields plus the honeypot, and shows the thank-you state after a successful send', async () => {
    const action = vi.fn(async (fd: FormData) => ({ ok: true, message: `Tack ${fd.get('name')}` }));
    const { container } = render(<ContactForm {...sample} action={action} />);
    for (const label of ['Namn (valfritt)', 'E-post', 'Telefon (valfritt)', 'Meddelande']) expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(container.querySelector('input[name="website"]')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Namn (valfritt)'), { target: { value: 'Anna' } });
    fireEvent.change(screen.getByLabelText('E-post'), { target: { value: 'a@b.se' } });
    fireEvent.change(screen.getByLabelText('Meddelande'), { target: { value: 'Hej där' } });
    fireEvent.click(screen.getByRole('button', { name: 'Skicka' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Tack Anna'));
    expect(action.mock.calls[0][0].get('message')).toBe('Hej där');
    expect(screen.queryByRole('button', { name: 'Skicka' })).not.toBeInTheDocument();
  });

  it('keeps the form and shows the error on a failed send; email and message are always present', async () => {
    render(<ContactForm {...sample} fields={['name']} action={async () => ({ ok: false, message: 'Nej' })} />);
    expect(screen.getByLabelText('E-post')).toBeInTheDocument();
    expect(screen.getByLabelText('Meddelande')).toBeInTheDocument();
    expect(screen.queryByLabelText('Telefon (valfritt)')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Skicka' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Nej'));
    expect(screen.getByRole('button', { name: 'Skicka' })).toBeInTheDocument();
  });
});
