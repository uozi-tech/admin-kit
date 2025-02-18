import type { I18nLanguage } from '../types'
import { useI18n } from 'vue-i18n'

export * from './en-US'
export * from './zh-CN'
export * from './zh-HK'
export * from './zh-TW'

function setLocale(l: I18nLanguage) {
  const { locale } = useI18n()
  locale.value = l
}

function getLocale() {
  const { locale } = useI18n()
  return locale
}

export function useLocale() {
  return {
    setLocale,
    getLocale,
  }
}
