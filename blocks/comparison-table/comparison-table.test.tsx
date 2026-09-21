import { render, screen } from '@testing-library/react';
import ComparisonTable from './comparison-table';
import { sample } from './sample';

describe('comparison-table', () => {
  it('renders columns, rows, icons with labels and the buttons', () => {
    render(<ComparisonTable {...sample} />);
    for (const c of sample.columns) {
      expect(screen.getByRole('columnheader', { name: new RegExp(c.name) })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: c.cta!.label })).toHaveAttribute('href', c.cta!.href);
    }
    for (const r of sample.rows) expect(screen.getByRole('rowheader', { name: r.label })).toBeInTheDocument();
    const yes = sample.rows.flatMap((r) => r.values).filter((v) => v === true).length;
    const no = sample.rows.flatMap((r) => r.values).filter((v) => v === false).length;
    expect(screen.getAllByLabelText('Ja')).toHaveLength(yes);
    expect(screen.getAllByLabelText('Nej')).toHaveLength(no);
    expect(screen.getAllByText('Alla dagar')).toHaveLength(2);
  });

  it('highlights the marked column', () => {
    const { container } = render(<ComparisonTable columns={sample.columns} rows={sample.rows.slice(0, 1)} />);
    const headers = container.querySelectorAll('thead th');
    expect(headers[2].className).toContain('bg-primary/10');
    expect(headers[1].className).not.toContain('bg-primary/10');
  });
});
