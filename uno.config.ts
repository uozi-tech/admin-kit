// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bg-base': 'bg-white dark:bg-gray-9',
      'text-color-base': 'text-gray-9 dark:text-gray-1'
    }
  ],
  rules: [],
  variants: [
    matcher => {
      if (!matcher.endsWith('!')) return matcher
      return {
        matcher: matcher.slice(0, -1),
        selector: s => `${s}!important`,
      }
    },
  ],
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|[jt]sx|ts)($|\?)/,
      ],
    },
  },
})
