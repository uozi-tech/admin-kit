<script setup lang="ts">
import { isArray, isObject } from 'lodash-es'
import { Languages, LanguageValue } from '../props.ts'

const props = defineProps<{
  currentLanguage?: LanguageValue
  languages?: Languages
}>()

const emit = defineEmits(['changeLanguage'])

const AvailableLanguages = computed(() => {
  if (isArray(props.languages)) {
    // 格式化为 key-value 对象
    const languageMap: Record<string, LanguageValue> = {}
    props.languages.forEach(language => {
      languageMap[language] = language
    })
    return languageMap
  }
  if (isObject(props.languages))
    return props.languages

  return {}
})

const currentSelectedLanguage = ref(props.currentLanguage)

function changeLanguage() {
  document.documentElement.setAttribute('lang', currentSelectedLanguage.value as string)
  emit('changeLanguage', currentSelectedLanguage.value)
}
</script>

<template>
  <ASelect
    v-model:value="currentSelectedLanguage"
    size="small"
    class="min-w-60px"
    :dropdown-match-select-width="false"
    @select="changeLanguage"
  >
    <ASelectOption
      v-for="(language, key) in AvailableLanguages"
      :key="key"
      :value="key"
    >
      {{ language }}
    </ASelectOption>
  </ASelect>
</template>

<style scoped>
:deep(.ant-select-dropdown .ant-select-item) {
  min-height: 24px !important;
  padding: 2px 12px !important;
}
</style>
