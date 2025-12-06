import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      // Disable the overly strict set-state-in-effect rule
      'react-hooks/set-state-in-effect': 'off',
      // Allow explicit any for cases where it's needed (like icon mapping)
      '@typescript-eslint/no-explicit-any': 'warn',
      // Allow unused variables that start with _ (for ignored params)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]);

export default eslintConfig;
