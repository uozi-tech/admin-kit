import defineConfig from 'eslint-config-airbe'
import autoImportGlobals from './.eslintrc-auto-import.mjs'

export default defineConfig({
  globals: autoImportGlobals.globals,
})
