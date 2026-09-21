import { render, screen } from '@testing-library/react';
import ContactMap, { toTelHref } from './contact-map';
import { sample } from './sample';

describe('contact-map', () => {
  it('renders address, links and the map', () => {
    render(<ContactMap {...sample} />);
    for (const line of sample.address) expect(screen.getByText(line)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: sample.phone })).toHaveAttribute('href', 'tel:+46181234 56'.replace(/\s/g, ''));
    expect(screen.getByRole('link', { name: sample.email })).toHaveAttribute('href', `mailto:${sample.email}`);
    for (const line of sample.hours!) expect(screen.getByText(line)).toBeInTheDocument();
    expect(screen.getByTitle(/Karta till/)).toHaveAttribute('src', sample.mapEmbedUrl);
  });

  it('renders without a map when mapEmbedUrl is omitted', () => {
    render(<ContactMap {...sample} mapEmbedUrl={undefined} />);
    expect(screen.queryByTitle(/Karta till/)).not.toBeInTheDocument();
  });

  it('derives tel: hrefs the Swedish way', () => {
    expect(toTelHref('018-12 34 56')).toBe('tel:+46181234 56'.replace(/\s/g, ''));
    expect(toTelHref('+46 18 12 34 56')).toBe('tel:+4618123456');
  });
});
