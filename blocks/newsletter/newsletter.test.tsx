import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Newsletter from './newsletter';
import { sample } from './sample';

describe('newsletter', () => {
  it('submits the e-mail through action and shows the result', async () => {
    const action = vi.fn(async (fd: FormData) => ({ ok: true, message: `Tack ${fd.get('email')}` }));
    render(<Newsletter {...sample} action={action} />);
    fireEvent.change(screen.getByLabelText('E-postadress'), { target: { value: 'a@b.se' } });
    fireEvent.click(screen.getByRole('button', { name: sample.buttonLabel }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Tack a@b.se'));
    expect(action).toHaveBeenCalledTimes(1);
    expect(action.mock.calls[0][0].get('email')).toBe('a@b.se');
  });

  it('shows the error message when the action fails', async () => {
    render(<Newsletter {...sample} action={async () => ({ ok: false, message: 'Nej' })} />);
    fireEvent.change(screen.getByLabelText('E-postadress'), { target: { value: 'x' } });
    fireEvent.click(screen.getByRole('button', { name: sample.buttonLabel }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Nej'));
  });
});
