<script setup lang="tsx">
import type { DescriptionsProps } from 'ant-design-vue'
import type { CustomRenderArgs, StdTableColumn } from '../types'
import { Button, Descriptions, DescriptionsItem, Flex, Form, FormItem, message } from 'ant-design-vue'
import { get } from 'lodash-es'
import { computed, reactive, ref, watch } from 'vue'
import { useLocale } from '../composables'
import { getEditLabel } from '../utils'
import FormControllerRender from './StdFormController.vue'

interface Props {
  record: any
  columns: StdTableColumn[]
  detailProps?: DescriptionsProps
  api?: (...args: any[]) => Promise<any>
  editable?: boolean
  editableFields?: string[]
  mode?: 'view' | 'edit'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  editable: false,
  mode: 'view',
})

const emit = defineEmits<{
  (e: 'save', data: any): void
  (e: 'cancel'): void
  (e: 'edit'): void
  (e: 'update:mode', mode: 'view' | 'edit'): void
}>()

const { t } = useLocale()

// 当前模式
const currentMode = computed({
  get: () => props.mode,
  set: value => emit('update:mode', value),
})

// 表单数据
const formData = ref<Record<string, any>>({})
const formRef = ref()

// 过滤显示的列
const displayColumns = computed(() =>
  props.columns.filter(item =>
    !item?.hiddenInDetail
    && item.dataIndex !== 'actions'
    && item.key !== 'actions',
  ),
)

// 初始化表单数据
watch(() => props.record, (newRecord) => {
  if (newRecord && Object.keys(newRecord).length > 0) {
    formData.value = reactive({ ...newRecord })
  }
}, { immediate: true, deep: true })

// 检查字段是否可编辑
function isFieldEditable(column: StdTableColumn): boolean {
  if (!props.editable || currentMode.value !== 'edit')
    return false

  const dataIndex = Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex

  if (props.editableFields?.length) {
    return props.editableFields.includes(dataIndex) && !!column.edit
  }

  return !!column.edit && !column.hiddenInEdit
}

// 进入编辑模式
function enterEditMode() {
  currentMode.value = 'edit'
  emit('edit')
}

// 保存
async function handleSave() {
  if (!formRef.value)
    return

  try {
    await formRef.value.validateFields()
    if (props.api) {
      await props.api(formData.value)
    }
    else {
      emit('save', { ...formData.value })
    }
    currentMode.value = 'view'
    message.success(t('saveSuccess'))
  }
  catch (error) {
    console.error('表单验证失败:', error)
    message.error(t('formValidateError'))
  }
}

// 取消编辑
function handleCancel() {
  // 重置表单数据
  formData.value = reactive({ ...props.record })
  currentMode.value = 'view'
  emit('cancel')
}

// 数据项渲染
function DataItemRender(renderProps: CustomRenderArgs) {
  const { record, column } = renderProps
  const value = get(record, column.dataIndex)
  return column.customRender ? column.customRender(renderProps, 'detail') : value ?? '/'
}

// 表单项渲染
function FormItemRender({ column }: { column: StdTableColumn }) {
  const dataIndex = Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex

  return (
    <FormItem
      name={dataIndex}
      rules={column.edit?.formItem?.rules}
    >
      <FormControllerRender
        v-model:form-data={formData.value}
        column={column}
        mode="edit"
      />
    </FormItem>
  )
}
</script>

<template>
  <div>
    <!-- 操作按钮 -->
    <Flex
      v-if="editable"
      justify="end"
      gap="small"
      style="margin-bottom: 16px;"
    >
      <template v-if="currentMode === 'view'">
        <Button
          type="primary"
          @click="enterEditMode"
        >
          {{ t('edit') }}
        </Button>
      </template>
      <template v-else>
        <Button @click="handleCancel">
          {{ t('cancel') }}
        </Button>
        <Button
          type="primary"
          :loading="loading"
          @click="handleSave"
        >
          {{ t('save') }}
        </Button>
      </template>
    </Flex>

    <!-- 表单包装器（编辑模式） -->
    <Form
      v-if="currentMode === 'edit'"
      ref="formRef"
      :model="formData"
      layout="vertical"
    >
      <Descriptions
        bordered
        :column="1"
        v-bind="detailProps"
      >
        <DescriptionsItem
          v-for="(column, index) in displayColumns"
          :key="index"
          :label="getEditLabel(column, 'Detail')"
          :span="Number(column.edit?.col?.span) ?? 24"
        >
          <!-- 可编辑字段 -->
          <FormItemRender
            v-if="isFieldEditable(column)"
            :column="column"
          />
          <!-- 只读字段 -->
          <DataItemRender
            v-else-if="Object.keys(record).length"
            :record="record"
            :column="column"
            :text="get(record, column.dataIndex)"
            :value="get(record, column.dataIndex)"
            :index="index"
            :render-index="index"
          />
        </DescriptionsItem>
      </Descriptions>
    </Form>

    <!-- 查看模式 -->
    <Descriptions
      v-else
      bordered
      :column="1"
      v-bind="detailProps"
    >
      <DescriptionsItem
        v-for="(column, index) in displayColumns"
        :key="index"
        :label="getEditLabel(column, 'Detail')"
        :span="Number(column.edit?.col?.span) ?? 24"
      >
        <DataItemRender
          v-if="Object.keys(record).length"
          :record="record"
          :column="column"
          :text="get(record, column.dataIndex)"
          :value="get(record, column.dataIndex)"
          :index="index"
          :render-index="index"
        />
      </DescriptionsItem>
    </Descriptions>
  </div>
</template>
