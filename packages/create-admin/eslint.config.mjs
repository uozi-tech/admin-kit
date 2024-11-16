import defineConfig from 'eslint-config-airbe'
import sharedConfig from '../../eslint.config.mjs'

export default defineConfig({},
    ...sharedConfig, {
  rules: {
    'no-console': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
})
