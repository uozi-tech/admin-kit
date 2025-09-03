<script setup lang="tsx">
import type { Reactive } from 'vue'
import type { StdTableColumn } from '../types'
import { get, set } from 'lodash-es'
import { computed, watch } from 'vue'
import {
  StdAutoComplete,
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
  mode?: 'edit' | 'add' | 'search'
}>()

function Render() {
  const { dataIndex } = p.column

  let formConfig = p.column.edit as any

  if (p.formConfigKey === 'search' && isPlainObject(p.column.search)) {
    formConfig = p.column.search
  }

  const placeholder = computed(() => getPlaceholder(p.column, formConfig))
  const disabled = computed(() => {
    if (isFunction(formConfig?.disabled)) {
      return formConfig?.disabled({ formData: p.formData })
    }
    return formConfig?.disabled
  })

  if (isFunction(formConfig?.type)) {
    // Support custom render function
    return formConfig?.type({
      formData: p.formData,
      column: p.column,
      customComponent: formConfig?.customComponent,
      mode: p.mode,
      disabled: disabled.value,
    })
  }
  else if (isPlainObject(formConfig?.type) && formConfig?.type?.__name) {
  // Support custom component, but need to pass column to component and define model for it
    return (
      <formConfig.type
        v-model:value={p.formData[formConfig?.formItem?.name ?? dataIndex]}
        column={p.column}
        {...formConfig?.customComponent}
        mode={p.mode}
        disabled={disabled.value}
      />
    )
  }
  else {
    const componentConfig = formConfig?.[formConfig?.type]
    const valueKey = computed(() => {
      const key = formConfig?.valueKey ?? formConfig?.formItem?.name ?? dataIndex
      if (Array.isArray(key)) {
        return key.join('.')
      }

      return key
    })
    const value = computed({
      get: () => get(p.formData, valueKey.value)
        ?? componentConfig?.defaultValue
        ?? formConfig?.defaultValue,
      set: (v) => {
        set(p.formData, valueKey.value, v)
      },
    })

    // 回传 form 表单数据
    watch(value, (v) => {
      set(p.formData, valueKey.value, v)
    }, { immediate: true })

    // 字段联动逻辑
    if (p.mode !== 'search' && formConfig?.dependencies && formConfig?.onChange) {
      const dependencies = formConfig.dependencies
      const onChangeHandler = formConfig.onChange

      // 计算依赖字段的值
      const dependencyValues = computed(() => {
        const values: Record<string, any> = {}
        dependencies.forEach((dep) => {
          values[dep] = get(p.formData, dep)
        })
        return values
      })

      // 监听依赖值的变化
      watch(dependencyValues, (newDependencyValues) => {
        // 当依赖字段有值时，触发联动函数
        const hasValidDependencies = dependencies.some((dep) => {
          const depValue = newDependencyValues[dep]
          return depValue !== undefined && depValue !== null && depValue !== ''
        })

        if (hasValidDependencies) {
          try {
            onChangeHandler(value.value, p.formData, newDependencyValues)
          }
          catch (error) {
            console.error(error)
          }
        }
      }, { deep: true, immediate: true })
    }

    switch (formConfig?.type) {
      case 'input':
        return (
          <StdInput
            v-model:value={value.value}
            props={formConfig?.input}
            placeholder={placeholder.value}
            disabled={disabled.value}
            onUpdate:value={v => value.value = v}
          />
        )
      case 'inputNumber':
        return <StdInputNumber v-model:value={value.value} props={formConfig?.inputNumber} placeholder={placeholder.value} disabled={disabled.value} />
      case 'textarea':
        return <StdTextarea v-model:value={value.value} props={formConfig?.textarea} placeholder={placeholder.value} disabled={disabled.value} />
      case 'password':
        return <StdPassword v-model:value={value.value} props={formConfig?.password} placeholder={placeholder.value} disabled={disabled.value} />
      case 'select':
        return (
          <StdSelect
            v-model:value={value.value}
            props={formConfig?.select}
            placeholder={placeholder.value}
            disabled={disabled.value}
          />
        )
      case 'autoComplete':
        return (
          <StdAutoComplete
            v-model:value={value.value}
            props={formConfig?.autoComplete}
            placeholder={placeholder.value}
            disabled={disabled.value}
          />
        )
      case 'cascader':
        return <StdCascader v-model:value={value.value} props={formConfig?.cascader} placeholder={placeholder.value} disabled={disabled.value} />
      case 'checkboxGroup':
        return <StdCheckboxGroup v-model:value={value.value} props={formConfig?.checkboxGroup} placeholder={placeholder.value} disabled={disabled.value} />
      case 'radioGroup':
        return <StdRadioGroup v-model:value={value.value} props={formConfig?.radioGroup} placeholder={placeholder.value} disabled={disabled.value} />
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
            disabled={disabled.value}
          />
        )
      case 'time':
        return (
          <StdTimePicker
            v-model:value={value.value}
            props={formConfig?.time as any}
            placeholder={placeholder.value}
            disabled={disabled.value}
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
            disabled={disabled.value}
          />
        )
      }
      case 'switch':
        return <StdSwitch v-model:value={value.value} props={formConfig?.switch} disabled={disabled.value} />
      case 'slider':
        return (
          <div style="padding: 0 6px">
            <StdSlider v-model:value={value.value} props={formConfig?.slider} disabled={disabled.value} />
          </div>
        )
      case 'rate':
        return <StdRate v-model:value={value.value} props={formConfig?.rate} disabled={disabled.value} />
      case 'upload': {
        return <StdUpload v-model:value={value.value} props={formConfig?.upload} disabled={disabled.value} />
      }
      case 'selector': {
        return <StdSelector v-model:value={value.value} {...formConfig?.selector} placeholder={placeholder.value} disabled={disabled.value} />
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
