<script setup lang="tsx">
import { Form, FormItem } from 'ant-design-vue'
import { StdTableColumn } from '../types'
import { get } from 'lodash-es'
import getInternalFormController from './StdFormControllers'
import { inject } from 'vue'
import { i18n } from '../i18n'
import {isFunction, isPlainObject} from "../utils/util";

const props = defineProps<{
  labelAlign?: 'left' | 'right'
  columns: StdTableColumn[]
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>
  layout?: 'horizontal' | 'vertical' | 'inline'
  isSearchForm?: boolean
}>()

const formData = defineModel<Record<string, any>>('data', { default: {} })
const lang = inject('lang', 'en')

const formRef = ref()
defineExpose({
  'formRef': formRef
})

function placeholderHelper(column: StdTableColumn, form?: StdTableColumn['form']) {
  const type = form?.type
  if (!form || form?.[type]?.placeholder) return

  const lang = inject('lang', 'zh-CN')
  const isInputType = type === 'input' || type === 'input-number'
  if (!form?.[type]) {
    form[type] = {}
  }
  const fieldName = form?.formItem?.name ?? column.title ?? column.dataIndex
  form[type].placeholder = `${i18n[lang].please}${i18n[lang][isInputType ? 'input' : 'select']}${fieldName}`
}

function FormItemRender(p: { column: StdTableColumn }) {
  let item

  const { title, dataIndex, form } = p.column
  placeholderHelper(p.column, form)

  if (isFunction(form?.type)) {
    // Support custom render function
    item = form?.type(formData, p.column, props.isSearchForm)
  } else if (isPlainObject('object') && form?.type?.name) {
    // Support custom component, but need to pass column to component and define model for it
    item = (
      <form.type
        modelValue={get(formData.value, form?.formItem?.prop ?? dataIndex)}
        column={p.column}
        is-search-form={props.isSearchForm}
      />
    )
  } else {
    item = getInternalFormController(props.api, formData, form, dataIndex, lang, props.isSearchForm)
  }
  return (
    <FormItem
      style="margin-bottom: 12px;"
      {...form?.formItem}
      label={form?.formItem?.label ?? title}
      rules={props.isSearchForm ? [] : form?.formItem?.rules}
      required={!props.isSearchForm && form?.formItem?.required}
      name={form?.formItem?.name ?? dataIndex}
    >
      {item}
    </FormItem>
  )
}
</script>

<template>
  <Form ref="formRef" :model="formData" label-width="auto" :labelAlign="labelAlign ?? 'left'" :layout="props.layout ?? 'vertical'">
    <FormItemRender v-for="c in props.columns" :key="c.dataIndex" :column="c" />
    <slot :form-data="formData" />
  </Form>
</template>