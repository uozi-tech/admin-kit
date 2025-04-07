<script setup lang="ts">
import type { RowProps } from 'ant-design-vue'
import type { StdCurdProps, StdTableColumn } from '../types'
import { Col, Form, FormItem, FormItemRest, Row } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { getColumnKey, getEditLabel } from '../utils'
import FormControllerRender from './StdFormController.vue'

const props = defineProps<{
  labelAlign?: 'left' | 'right'
  columns: StdTableColumn[]
  layout?: 'horizontal' | 'vertical' | 'inline'
  formClass?: StdCurdProps['formClass']
  formRowProps?: RowProps
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

const formData = defineModel<Record<string, any>>('data', { default: () => reactive({}) })

for (const column of props.columns) {
  const key = (column.edit?.formItem?.name ?? column.dataIndex) as string
  if (column.edit && !formData.value[key]) {
    formData.value[key] = undefined
  }
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
    :class="props.formClass"
    :label-align="labelAlign ?? 'left'"
    :layout="props.layout ?? 'vertical'"
    :validate-trigger="['blur', 'submit']"
    @validate="onValidate"
  >
    <FormItemRest>
      <Row v-bind="props.formRowProps">
        <Col
          v-for="c in props.columns"
          :key="getColumnKey(c)"
          span="24"
          v-bind="c.edit?.col"
        >
          <FormItem
            :column="c"
            style="margin-bottom: 12px;"
            v-bind="c.edit?.formItem"
            :label="getEditLabel(c)"
            :name="c.edit?.valueKey ?? c.edit?.formItem?.name ?? c.dataIndex"
          >
            <FormControllerRender
              :column="c"
              :form-data="formData"
            />
          </FormItem>
        </Col>
      </Row>
    </FormItemRest>
  </Form>
</template>
