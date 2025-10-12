import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Ignore build artifacts and static/generated files
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**',
      'storybook-static/**',
      '*.js',
      '*.cjs',
      '*.mjs',
      '*.jsx',
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.jsx'
    ]
  },

  // Base JS + TypeScript (non type-checked) recommendations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Project-specific rules for our TS/React files
  {
    files: ['src/**/*.{ts,tsx}', 'stories/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}', '.storybook/**/*.{ts,tsx}', 'setupTests.ts'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        JSX: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Enforce double quotes
      quotes: ['error', 'double', { avoidEscape: true }],

      // Console usage in TS files
      'no-console': 'warn',

      // Requested TypeScript rules (non type-aware)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Typed linting only for source and tests (in tsconfig)
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}', 'setupTests.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Typed linting via project service
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  // Node.js scripts
  {
    files: ['scripts/**/*.{js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Allow console in scripts
      'no-console': 'off',
    },
  },
];