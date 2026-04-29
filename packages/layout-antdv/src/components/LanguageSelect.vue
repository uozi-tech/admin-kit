<script setup lang="ts">
import type { SelectProps } from 'antdv-next'
import type { Languages, LanguageValue } from '../props'
import { Select } from 'antdv-next'
import { isArray, isObject } from 'lodash-es'
import { computed, ref } from 'vue'

const props = defineProps<{
  currentLanguage?: LanguageValue
  languages?: Languages
}>()

const emit = defineEmits(['changeLanguage'])

const AvailableLanguages = computed<SelectProps['options']>(() => {
  if (isObject(props.languages)) {
    // 格式化为 { label: string, value: string } 数组
    return Object.entries(props.languages).map(([value, label]) => ({
      label,
      value,
    }))
  }
  if (isArray(props.languages))
    return props.languages as SelectProps['options']

  return []
})

const currentSelectedLanguage = ref(props.currentLanguage)

function changeLanguage() {
  document.documentElement.setAttribute('lang', currentSelectedLanguage.value as string)
  emit('changeLanguage', currentSelectedLanguage.value)
}
</script>

<template>
  <Select
    v-model:value="currentSelectedLanguage"
    size="small"
    class="min-w-60px"
    :dropdown-match-select-width="false"
    :options="AvailableLanguages"
    @select="changeLanguage"
  />
</template>

<style scoped>
:deep(.ant-select-dropdown .ant-select-item) {
  min-height: 24px !important;
  padding: 2px 12px !important;
}
</style>
