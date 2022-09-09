module.exports = {
    parser: '@typescript-eslint/parser',
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        excludedFiles: ['*.test.ts', '*.test.tsx'],
        extends: [
          'plugin:@typescript-eslint/recommended',
          'plugin:@typescript-eslint/recommended-requiring-type-checking',
        ],
        parserOptions: {
          project: './tsconfig.json',
        },
      },
      {
        files: ['**/?(*.)+(test).[jt]s?(x)'],
        plugins: ['jest', 'testing-library'],
        extends: ['plugin:jest/recommended', 'plugin:testing-library/react'],
      },
      {
        files: ['*.js'],
        plugins: ['node'],
        extends: ['plugin:node/recommended'],
      },
    ],
    env: {
      browser: true,
      node: true,
    },
    globals: {
      __DEV__: 'readonly',
      __TEST__: 'readonly',
      __MOCK__: 'readonly',
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      'quotes': [2, 'single', { 'avoidEscape': true }],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreTrailingComments: true,
          ignoreStrings: true,
        },
      ],
      'linebreak-style': 0,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'arrow-parens': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/type-annotation-spacing': ['error'],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'react/prop-types': 0,
      'react/function-component-definition': 'off',
      'react/display-name': 'off',
      'jsx-quotes': ['warn', 'prefer-single'],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/named': 'off',
      'import/no-unresolved': 'error',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: '**/*.scss', group: 'type', position: 'after' },
            { pattern: './*.scss', group: 'type', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          warnOnUnassignedImports: true,
        },
      ],
      'node/no-unpublished-require': 'off',
    },
    extends: [
      'eslint:recommended',
      'plugin:import/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
    ],
    plugins: ['import', 'jsx-a11y'],
  };
  