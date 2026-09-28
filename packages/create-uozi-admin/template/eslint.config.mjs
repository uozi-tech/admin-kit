import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/node_modules/*',
    '**/dist/*',
    '**/.eslint-auto-import.mjs',
    '**/auto-imports.d.ts',
    '**/components.d.ts',
    '**/vite.config.ts.timestamp*',
    '**/.pnpm-store/*',
    '**/locales/**.json',
  ],
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
  'no-console': 'warn',
  'no-new': 'off',
  'unused-imports/no-unused-vars': 'warn',
  'jsonc/sort-keys': 'off',
  'node/handle-callback-err': 'off',
  'ts/no-unsafe-function-type': 'off',
  'node/prefer-global/process': 'off',
  // Dependencies use plain semver ranges, not a pnpm catalog. antfu enables this
  // rule whenever a parent pnpm-workspace.yaml defines a catalog; overrideRules
  // only touches configs that already contain it, so this is safe without pnpm.
  'pnpm/json-enforce-catalog': 'off',
})
