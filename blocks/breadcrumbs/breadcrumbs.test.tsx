import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { sample } from './sample';

describe('breadcrumbs', () => {
  it('renders home, the links and the current page, plus JSON-LD with absolute urls', () => {
    const { container } = render(<Breadcrumbs {...sample} />);
    expect(screen.getByRole('navigation', { name: 'Brödsmulor' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Hem' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Odling' })).toHaveAttribute('href', '/collection/odling');
    const current = screen.getByText('Odlingslåda ek 120 cm');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.tagName).toBe('SPAN');
    const ld = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement).toHaveLength(4);
    expect(ld.itemListElement[1].item).toBe('https://www.exempel.se/collection/odling');
    expect(ld.itemListElement[3].item).toBeUndefined();
  });

  it('can skip JSON-LD', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'Kontakt' }]} jsonLd={false} />);
    expect(container.querySelector('script')).toBeNull();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
