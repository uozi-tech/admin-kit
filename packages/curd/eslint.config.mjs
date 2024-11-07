import defineConfig from 'eslint-config-airbe'
import autoImportGlobals from './.eslint-auto-import.mjs'
import sharedConfig from '../../eslint.config.mjs'

export default defineConfig({
  globals: autoImportGlobals.globals,
}, ...sharedConfig, {
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
})
