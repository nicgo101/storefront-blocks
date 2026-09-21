import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['blocks/**/*.test.tsx'],
    passWithNoTests: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: [
      // The showcase's stand-ins play the storefront in tests.
      { find: '@nicgo101/storefront-commerce/api', replacement: here('./showcase/src/lib/commerce-mock.ts') },
      { find: '@nicgo101/storefront-commerce/cached', replacement: here('./showcase/src/lib/commerce-mock.ts') },
      { find: 'next/cache', replacement: here('./showcase/src/lib/next-cache-mock.ts') },
      { find: /^@\/components\/blocks\/(.*)$/, replacement: here('./blocks') + '/$1' },
      { find: /^@\/(.*)$/, replacement: here('./showcase/src') + '/$1' },
    ],
  },
});
