import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLocale() {
  const i18n = useI18n()
  const { locale: lang } = useConfigContextInject()

  watchEffect(() => {
    switch (lang?.value.locale) {
      case 'zh-cn':
        i18n.locale.value = 'zh-CN'
        break
      case 'zh-hk':
        i18n.locale.value = 'zh-HK'
        break
      case 'zh-tw':
        i18n.locale.value = 'zh-TW'
        break
      default:
        i18n.locale.value = 'en-US'
    }
  })

  return i18n
}
