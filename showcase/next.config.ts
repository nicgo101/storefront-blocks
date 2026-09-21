import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

const mock = fileURLToPath(new URL('./src/lib/commerce-mock.ts', import.meta.url));

/**
 * The showcase renders blocks with sample data and no shop-api: the commerce
 * client is aliased to a mock here and ONLY here. On a real storefront the
 * block imports the real `@nicgo101/storefront-commerce/*`.
 */
const config: NextConfig = {
  transpilePackages: ['@nicgo101/storefront-commerce'],
  images: { remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }] },
  turbopack: {
    resolveAlias: {
      '@nicgo101/storefront-commerce/api': './src/lib/commerce-mock.ts',
      '@nicgo101/storefront-commerce/cached': './src/lib/commerce-mock.ts',
    },
  },
  webpack: (cfg) => {
    cfg.resolve.alias['@nicgo101/storefront-commerce/api'] = mock;
    cfg.resolve.alias['@nicgo101/storefront-commerce/cached'] = mock;
    return cfg;
  },
};

export default config;
