import { useI18n } from 'vue-i18n'

export function getFormErrors() {
  const { t } = useI18n()
  return {
    required: () => t('validate.required'),
    email: () => t('validate.email'),
    db_unique: () => t('validate.db_unique'),
    hostname: () => t('validate.hostname'),
    safety_text: () => t('validate.safety_text'),
  }
}
