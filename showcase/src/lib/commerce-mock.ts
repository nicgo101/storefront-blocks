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

/** `query(document, variables)` → `{ data }` shaped like the real client's answer. */
export async function query(_document: unknown, variables?: { input?: { take?: number } }) {
  const take = variables?.input?.take ?? 8;
  const items = mockProducts(take);
  return { data: { search: { items, totalItems: items.length } } };
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
