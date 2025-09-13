import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  markdown: false,
  ignores: [
    '**/node_modules/*',
    '**/dist/*',
    '**/vite.config.ts.timestamp*',
    '**/.pnpm-store/*',
    '**/locales/**.json',
  ],
}, {
  files: ['playground/mock/**/*.ts'],
  rules: {
    'no-console': 'off',
    'ts/no-require-imports': 'off',
  },
}).overrideRules({
  'vue/no-dupe-keys': 'off',
  'vue/html-indent': ['error', 2],
  'vue/max-attributes-per-line': ['error', {
    singleline: {
      max: 1,
    },
    multiline: {
      max: 1,
    },
  }],
  'vue/first-attribute-linebreak': ['error', {
    singleline: 'beside',
    multiline: 'below',
  }],
  'ts/no-use-before-define': 'off',
  'ts/no-non-null-asserted-optional-chain': 'warn',
  'ts/explicit-function-return-type': 'off',
  'ts/no-unsafe-function-type': 'off',
  'no-console': ['warn', { allow: ['error', 'warn'] }],
  'no-new': 'off',
  'jsonc/sort-keys': 'off',
  'node/handle-callback-err': 'off',
  'node/prefer-global/process': 'off',
  'antfu/no-import-dist': 'off',
  'unused-imports/no-unused-vars': 'warn',
  'unused-imports/no-unused-imports': 'warn',
})
