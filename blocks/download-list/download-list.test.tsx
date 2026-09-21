import { render, screen } from '@testing-library/react';
import DownloadList, { fileType } from './download-list';
import { sample } from './sample';

describe('download-list', () => {
  it('renders one link per file with type and size', () => {
    render(<DownloadList {...sample} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(sample.files.length);
    expect(links[0]).toHaveAttribute('href', sample.files[0].href);
    expect(links[0]).toHaveAttribute('download');
    expect(links[0]).toHaveTextContent('PDF · 2,4 MB');
    expect(links[2]).toHaveTextContent('XLSX');
  });

  it('opens external files in a new tab without download, and derives types', () => {
    render(<DownloadList files={[{ title: 'Extern', href: 'https://cdn.example/x.pdf?x=1' }]} layout="grid" title={null} />);
    const a = screen.getByRole('link');
    expect(a).toHaveAttribute('target', '_blank');
    expect(a).not.toHaveAttribute('download');
    expect(fileType('/a/b.PDF')).toBe('PDF');
    expect(fileType('/a/b')).toBe('FIL');
    expect(fileType('/a/b.pdf', 'Manual')).toBe('MANUAL');
  });
});
