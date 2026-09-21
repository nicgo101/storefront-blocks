// Block code may import only what every consuming storefront already has.
// The list is the contract in README.md §Block rules; the manifest builder
// cross-checks `uses.site` for the one exception (site files a shop block needs).
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const ALLOWED_IN_BLOCKS = [
  'react', 'react/*', 'next/*', '@/components/ui/*', '@/lib/utils', 'lucide-react', 'embla-carousel-react',
  '@nicgo101/storefront-commerce/*',
  // shop blocks: site files listed under `uses.site` in block.json
  '@/components/commerce/product-card', '@/components/commerce/product-carousel',
];

const NODE_GLOBALS = { process: 'readonly', console: 'readonly', URL: 'readonly', fetch: 'readonly', setTimeout: 'readonly', document: 'readonly' };

export default tseslint.config(
  { ignores: ['node_modules/**', 'showcase/.next/**', 'showcase/src/generated/**', 'showcase/next-env.d.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-undef': 'off', // TypeScript checks this; eslint's copy has no DOM/React globals
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['blocks/**/*.{ts,tsx}'],
    ignores: ['blocks/**/*.test.tsx'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{
          group: ['*', ...ALLOWED_IN_BLOCKS.map((p) => '!' + p), '!./*', '!../*'],
          message: `A block may import only: ${ALLOWED_IN_BLOCKS.join(', ')} (README.md §Block rules).`,
        }],
      }],
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: NODE_GLOBALS },
  },
);
