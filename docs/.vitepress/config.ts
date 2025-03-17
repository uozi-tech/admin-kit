import { defineConfig } from 'vitepress'
import shared from './shared'
import zh from './zh'

export default defineConfig({
  ...shared,

  locales: {
    root: {
      label: '简',
      ...zh,
    },
  },
})
