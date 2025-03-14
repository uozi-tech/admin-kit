<script setup lang="tsx">
import type { Reactive } from 'vue'
import type { StdTableColumn } from '../types'
import { get, isBoolean, set } from 'lodash-es'
import { computed, ref, watch } from 'vue'
import {
  StdCascader,
  StdCheckboxGroup,
  StdDatePicker,
  StdInput,
  StdInputNumber,
  StdPassword,
  StdRadioGroup,
  StdRangePicker,
  StdRate,
  StdSelect,
  StdSelector,
  StdSlider,
  StdSwitch,
  StdTimePicker,
  StdUpload,
} from '../components/form'
import { getPlaceholder } from '../utils/helper'
import { isFunction, isPlainObject } from '../utils/util'
import StdTextarea from './form/StdTextarea.vue'

const p = defineProps<{
  formData: Reactive<Record<string, any>>
  column: StdTableColumn
  formConfigKey?: 'edit' | 'search'
}>()

function Render() {
  const { dataIndex } = p.column

  let formConfig = p.column.edit as any

  if (p.formConfigKey === 'search' && isPlainObject(p.column.search)) {
    formConfig = p.column.search
  }

  const placeholder = computed(() => getPlaceholder(p.column, formConfig))
  if (isFunction(formConfig?.type)) {
  // Support custom render function
    return formConfig?.type(p.formData, p.column, formConfig?.customComponent)
  }
  else if (isPlainObject(formConfig?.type) && formConfig?.type?.__name) {
  // Support custom component, but need to pass column to component and define model for it
    return (
      <formConfig.type
        v-model:value={p.formData[formConfig?.formItem?.name ?? dataIndex]}
        column={p.column}
        {...formConfig?.customComponent}
      />
    )
  }
  else {
    const componentConfig = formConfig?.[formConfig?.type]
    const valueKey = formConfig?.valueKey ?? formConfig?.formItem?.name ?? dataIndex
    const value = ref(componentConfig?.defaultValue)

    // 接受外部数据
    watch(() => get(p.formData, valueKey), (newVal, oldVal) => {
      if (isBoolean(oldVal)) {
        value.value = newVal ?? componentConfig?.defaultValue ?? Boolean(newVal)
      }
      else {
        value.value = newVal ?? componentConfig?.defaultValue
      }
    }, { deep: true, immediate: true })

    // 回传 form 表单数据
    watch(value, (v) => {
      set(p.formData, valueKey, v)
    })

    switch (formConfig?.type) {
      case 'input':
        return <StdInput v-model:value={value.value} props={formConfig?.input} name={formConfig?.formItem?.name ?? dataIndex} placeholder={placeholder.value} />
      case 'inputNumber':
        return <StdInputNumber v-model:value={value.value} props={formConfig?.inputNumber} placeholder={placeholder.value} />
      case 'textarea':
        return <StdTextarea v-model:value={value.value} props={formConfig?.textarea} placeholder={placeholder.value} />
      case 'password':
        return <StdPassword v-model:value={value.value} props={formConfig?.password} placeholder={placeholder.value} />
      case 'select':
        return (
          <StdSelect
            v-model:value={value.value}
            props={formConfig?.select}
            placeholder={placeholder.value}
          />
        )
      case 'cascader':
        return <StdCascader v-model:value={value.value} props={formConfig?.cascader} placeholder={placeholder.value} />
      case 'checkboxGroup':
        return <StdCheckboxGroup v-model:value={value.value} props={formConfig?.checkboxGroup} placeholder={placeholder.value} />
      case 'radioGroup':
        return <StdRadioGroup v-model:value={value.value} props={formConfig?.radioGroup} placeholder={placeholder.value} />
      case 'date':
      case 'datetime':
      case 'year':
      case 'month':
      case 'week':
        return (
          <StdDatePicker
            v-model:value={value.value}
            props={formConfig[formConfig?.type]}
            type={formConfig.type}
            placeholder={placeholder.value}
          />
        )
      case 'time':
        return (
          <StdTimePicker
            v-model:value={value.value}
            props={formConfig?.time as any}
            placeholder={placeholder.value}
          />
        )
      case 'dateRange':
      case 'datetimeRange':
      case 'yearRange':
      case 'monthRange':
      case 'weekRange':
      case 'timeRange': {
        const pickerType = formConfig?.type?.replace('Range', '')

        return (
          <StdRangePicker
            v-model:value={value.value}
            props={{ ...formConfig[formConfig?.type], placeholder: undefined }}
            type={pickerType}
          />
        )
      }
      case 'switch':
        return <StdSwitch v-model:value={value.value} props={formConfig?.switch} />
      case 'slider':
        return (
          <div style="padding: 0 6px">
            <StdSlider v-model:value={value.value} props={formConfig?.slider} />
          </div>
        )
      case 'rate':
        return <StdRate v-model:value={value.value} props={formConfig?.rate} />
      case 'upload': {
        return <StdUpload v-model:value={value.value} />
      }
      case 'selector': {
        return <StdSelector v-model:value={value.value} {...formConfig?.selector} placeholder={placeholder.value} />
      }
      default:
        return null
    }
  }
}
</script>

<template>
  <Render />
</template>
