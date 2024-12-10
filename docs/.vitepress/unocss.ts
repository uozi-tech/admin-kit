import type {
  UserConfig,
} from 'unocss'
import type { PluginOption } from 'vite'
import {
  mergeConfigs,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import UnoCSS from 'unocss/vite'
import presetChinese, { chineseTypography } from 'unocss-preset-chinese'
import presetEase from 'unocss-preset-ease'

export interface VitePluginConfig extends UserConfig {
  inspector?: boolean
  mode?: 'global' | 'per-module' | 'vue-scoped' | 'dist-chunk' | 'shadow-dom'
  transformCSS?: boolean | 'pre' | 'post'
  postcss?: boolean
  hmrTopLevelAwait?: boolean
  fetchMode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin'
}

const defaultConfig: VitePluginConfig = {
  mode: 'global',
  content: {
    pipeline: {
      include: ['**/*.{ts,jsx,tsx,vue}'],
      exclude: ['node_modules', '.git', 'dist'],
    },
  },
  presets: [
    presetUno({ dark: 'class' }),
    presetAttributify(),
    chineseTypography(),
    presetChinese({
      chineseType: 'simplified',
    }),
    presetEase(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  shortcuts: {
    // position
    'common-bg': 'bg-gray-100 dark:bg-gray-900',
    'pr': 'relative',
    'pa': 'absolute',
    'pf': 'fixed',
    'ps': 'sticky',

    // position layout
    'position-x-center': 'absolute left-1/2 -translate-x-1/2',
    'pxc': 'position-x-center',
    'position-y-center': 'absolute top-1/2 -translate-y-1/2',
    'pyc': 'position-y-center',
    'position-center': 'position-x-center position-y-center',
    'pc': 'position-center',

    // size
    'size-0': 'w-0 h-0',
    'size-full': 'w-full h-full',
    'size-screen': 'w-screen h-screen',
    'size-1/2': 'w-1/2 h-1/2',

    // flex layout
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
  },
  theme: {
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
}

export function createUnoCSSPluginConfig(customConfig: VitePluginConfig = {}): PluginOption {
  return UnoCSS(mergeConfigs([defaultConfig, customConfig]))
}
