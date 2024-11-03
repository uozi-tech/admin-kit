import defineConfig from 'eslint-config-airbe'
import autoImportGlobals from './.eslint-auto-import.mjs'

export default defineConfig({
  js: true,
  ts: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/require-await': 'off',
  },
  vue: true,
  stylistic: {
    '@stylistic/quote-props': 'off',
    '@stylistic/eol-last': 'warn',
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/jsx-wrap-multilines': 'off',
    '@stylistic/jsx-closing-tag-location': 'off',
    '@stylistic/no-trailing-spaces': 'off',
  },
  importX: true,
  unusedImports: true,
  ignores: ['**/node_modules', '**/dist', '.eslint-auto-import.mjs', 'vite.config.ts.timestamp*'],
  globals: autoImportGlobals.globals,
}, {
  languageOptions: {
    parserOptions: {
      projectService: {
        maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 9999,
      },
    },
  },
})
