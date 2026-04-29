import type { Composer } from 'vue-i18n'
import type { CurdLocaleValue, I18nLanguage } from '../types'
import { toValue, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCurdConfig } from './useCurdConfig'

function normalizeLocale(locale?: CurdLocaleValue): I18nLanguage {
  const localeValue = typeof locale === 'string' ? locale : locale?.locale

  switch (localeValue?.replace('_', '-').toLowerCase()) {
    case 'zh-cn':
      return 'zh-CN'
    case 'zh-hk':
      return 'zh-HK'
    case 'zh-tw':
      return 'zh-TW'
    case 'en-us':
      return 'en-US'
    default:
      return 'en-US'
  }
}

export function useLocale(): Composer {
  const i18n = useI18n()
  const curdConfig = useCurdConfig()

  watchEffect(() => {
    const locale = toValue(curdConfig.locale)
    const fallbackLocale = toValue(curdConfig.i18n?.locale)

    i18n.locale.value = normalizeLocale(locale ?? fallbackLocale)
  })

  return i18n
}
