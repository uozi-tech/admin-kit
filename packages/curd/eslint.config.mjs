import defineConfig from 'eslint-config-airbe'
import autoImportGlobals from './.eslint-auto-import.mjs'

export default defineConfig({
  globals: autoImportGlobals.globals,
})
