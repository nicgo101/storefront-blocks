/**
 * Stand-in for `@nicgo101/storefront-commerce/api` and `/cached` in the
 * showcase and in tests. Shop blocks import the real subpaths; the showcase's
 * next.config and vitest.config alias them here so no shop-api is needed.
 *
 * Shapes follow `ProductCardFragment` (SearchResult) and `getTopCollections`.
 */

export type MockSearchItem = {
  productId: string;
  productVariantId: string;
  productName: string;
  slug: string;
  productAsset: { id: string; preview: string } | null;
  priceWithTax: { __typename: 'PriceRange'; min: number; max: number } | { __typename: 'SinglePrice'; value: number };
  currencyCode: 'SEK';
  facetValueIds: string[];
  inStock: boolean;
  optionSummary: string | null;
  campaign: null;
};

const NAMES = ['Trädgårdsslang 25 m', 'Planteringsspade', 'Odlingslåda ek', 'Gödsel 5 kg', 'Beskärningssax', 'Kruka terrakotta 30 cm', 'Fröpåse sommarblommor', 'Regntunna 200 l'];

export function mockProducts(take = 8): MockSearchItem[] {
  return Array.from({ length: take }, (_, i) => ({
    productId: String(100 + i),
    productVariantId: String(200 + i),
    productName: NAMES[i % NAMES.length],
    slug: `produkt-${i + 1}`,
    productAsset: { id: String(300 + i), preview: `https://picsum.photos/seed/block-${i}/600/600` },
    priceWithTax: i % 3 === 0 ? { __typename: 'PriceRange', min: 9900 + i * 1000, max: 14900 + i * 1000 } : { __typename: 'SinglePrice', value: 12900 + i * 500 },
    currencyCode: 'SEK',
    facetValueIds: [],
    inStock: i !== 5,
    optionSummary: null,
    campaign: null,
  }));
}

/**
 * `query(document, variables)` → `{ data }` shaped like the real client's answer.
 * The document is opaque here; the variables say which query it is: `slug` = a
 * product by slug, otherwise a search.
 */
export async function query(_document: unknown, variables?: { input?: { take?: number }; slug?: string }) {
  if (variables && typeof variables.slug === 'string') {
    if (variables.slug === 'finns-inte') return { data: { product: null } };
    return { data: { product: { id: '100', name: 'Trädgårdsslang 25 m', slug: variables.slug, featuredAsset: { preview: 'https://picsum.photos/seed/spotlight/1200/900' }, variants: [{ priceWithTax: 49900, currencyCode: 'SEK' }, { priceWithTax: 79900, currencyCode: 'SEK' }] } } };
  }
  const take = variables?.input?.take ?? 8;
  const items = mockProducts(take);
  const facetValues = ['Gardena', 'Fiskars', 'Husqvarna', 'Weibulls', 'Hozelock', 'Kärcher'].map((name, i) => ({
    count: 12 - i, facetValue: { id: String(500 + i), name, customFields: { rangeMin: null, rangeMax: null }, facet: { id: '50', name: 'Märke', code: 'brand' } },
  }));
  facetValues.push({ count: 3, facetValue: { id: '600', name: 'Röd', customFields: { rangeMin: null, rangeMax: null }, facet: { id: '60', name: 'Färg', code: 'color' } } });
  return { data: { search: { items, totalItems: items.length, facetValues } } };
}

export async function mutate(): Promise<never> {
  throw new Error('commerce-mock: mutate is not available in the showcase');
}

export type MockCollection = {
  id: string;
  name: string;
  slug: string;
  featuredAsset: { id: string; preview: string } | null;
  parent?: { name: string } | null;
};

export async function getTopCollections(): Promise<MockCollection[]> {
  return [
    { id: '1', name: 'Odling', slug: 'odling', featuredAsset: { id: '11', preview: 'https://picsum.photos/seed/odling/1600/700' } },
    { id: '2', name: 'Verktyg', slug: 'verktyg', featuredAsset: { id: '12', preview: 'https://picsum.photos/seed/verktyg/1600/700' } },
    { id: '3', name: 'Bevattning', slug: 'bevattning', featuredAsset: null },
  ];
}
