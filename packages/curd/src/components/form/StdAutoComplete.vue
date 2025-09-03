<script setup lang="ts">
import type { AutoCompleteConfig } from '../../types'
import { AutoComplete } from 'ant-design-vue'
import { isNumber } from 'lodash-es'
import { computed, ref, watch } from 'vue'
import { getPopupContainer } from '../../utils'

const p = defineProps<{
  props?: AutoCompleteConfig
  placeholder?: string | number
  disabled?: boolean
}>()

const value = defineModel<AutoCompleteConfig['value']>('value')

const options = ref()

const isNumberValue = computed(() => isNumber(value.value))

async function computedOptions() {
  if (p.props?.remote) {
    const { valueKey, labelKey, api } = p.props.remote
    const resp = await api()
    options.value = resp.data.map(item => ({
      label: item[labelKey],
      value: isNumberValue.value ? Number(item[valueKey]) : item[valueKey],
    }))
    return
  }
  if (p.props?.mask) {
    options.value = Object.entries(p.props.mask).map(([v, label]) => ({
      label,
      value: isNumberValue.value ? Number(v) : v,
    }))
    return
  }
  options.value = p.props?.options
}

watch(value, computedOptions, { immediate: true })
</script>

<template>
  <AutoComplete
    v-model:value="value as any"
    class="min-w-180px"
    :dropdown-match-select-width="false"
    :get-popup-container="getPopupContainer"
    allow-clear
    :placeholder
    :disabled
    v-bind="props"
    :options="options"
  />
</template>
