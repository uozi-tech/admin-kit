<script setup lang="ts">
import type { SelectConfig } from '../../types'
import { Select } from 'ant-design-vue'
import { isNumber } from 'lodash-es'
import { computed, ref, watch } from 'vue'

const p = defineProps<{ props?: SelectConfig & { placeholder?: string | number } }>()

const value = defineModel<SelectConfig['value']>('value')

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
  <Select
    v-model:value="value as any"
    :dropdown-match-select-width="false"
    allow-clear
    v-bind="props"
    :options="options"
  />
</template>
