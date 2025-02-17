<script setup lang="ts">
import type { StdTableColumn } from '../types'
import { Form, FormItem, FormItemRest } from 'ant-design-vue'
import { ref } from 'vue'
import { getColumnKey, getRealContent } from '../utils/util'
import FormControllerRender from './StdFormController.vue'

const props = defineProps<{
  labelAlign?: 'left' | 'right'
  columns: StdTableColumn[]
  layout?: 'horizontal' | 'vertical' | 'inline'
}>()

const emit = defineEmits<{
  (e: 'validate', payload: {
    name: string | number | string[] | number[]
    status: boolean
    errors: string[]
  }): void
}>()

function onValidate(name: string | number | string[] | number[], status: boolean, errors: string[]) {
  emit('validate', { name, status, errors })
}

const formData = defineModel<Record<string, any>>('data', { default: () => ({}) })

for (const column of props.columns) {
  const key = (column.edit?.formItem?.name ?? column.dataIndex) as string
  if (column.edit && !formData.value[key]) {
    formData.value[key] = undefined
  }
}

function getLabel(c: StdTableColumn) {
  if (c.edit?.formItem?.hiddenLabel) {
    return
  }

  return getRealContent(c.edit?.formItem?.label ?? c.title)
}

const formRef = ref()
defineExpose({
  formRef,
})
</script>

<template>
  <Form
    ref="formRef"
    :model="formData"
    label-width="auto"
    :label-align="labelAlign ?? 'left'"
    :layout="props.layout ?? 'vertical'"
    :validate-trigger="['blur', 'submit']"
    @validate="onValidate"
  >
    <FormItemRest>
      <FormItem
        v-for="c in props.columns"
        :key="getColumnKey(c)"
        :column="c"
        style="margin-bottom: 12px;"
        v-bind="c.edit?.formItem"
        :label="getLabel(c)"
        :name="c.edit?.valueKey ?? c.edit?.formItem?.name ?? c.dataIndex"
      >
        <FormControllerRender
          :column="c"
          :form-data="formData"
        />
      </FormItem>
    </FormItemRest>
  </Form>
</template>
