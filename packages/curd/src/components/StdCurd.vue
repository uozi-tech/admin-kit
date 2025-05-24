<script setup lang="ts">
import type { StdCurdProps } from '../types'
import { Button, Card, Checkbox, Divider, Flex, message, Modal, Spin } from 'ant-design-vue'
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import { computed, getCurrentInstance, reactive, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useExport } from '../composables'
import { ApiActions } from '../constants'
import { getRealContent } from '../utils'
import StdBatchEdit from './StdBatchEdit.vue'
import StdDetail from './StdDetail.vue'
import StdForm from './StdForm.vue'
import StdTable from './StdTable.vue'

const props = withDefaults(defineProps<StdCurdProps>(), {
  rowKey: 'id',
  showSearchBtn: undefined,
  formRowProps: () => ({
    gutter: 16,
  }),
})

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'view', record: any): void
  (e: 'editItem', record: any): void
  (e: 'deleteItemTemporarily', record: any): void
  (e: 'restoreItem', record: any): void
  (e: 'deleteItemPermanently', record: any): void
}>()

const route = useRoute()
const { t, locale } = useI18n()
const { locale: lang } = useConfigContextInject()
const instance = getCurrentInstance()

watchEffect(() => {
  switch (lang?.value.locale) {
    case 'zh-cn':
      locale.value = 'zh-CN'
      break
    case 'zh-hk':
      locale.value = 'zh-HK'
      break
    case 'zh-tw':
      locale.value = 'zh-TW'
      break
    default:
      locale.value = 'en-US'
  }
})

const refreshConfig = reactive({
  timestamp: 0,
  reset: false,
})

function refresh(reset: boolean = false) {
  refreshConfig.timestamp = Date.now()
  refreshConfig.reset = reset
}

const tableLoading = ref(false)

const selectedRowKeys = defineModel<any[]>('selectedRowKeys', { default: () => reactive([]) })
const selectedRows = defineModel<any[]>('selectedRows', { default: () => reactive([]) })

const stdForm = ref()
const stdBatchEdit = ref()

function onSave() {
  const { formRef } = stdForm.value
  formRef.validateFields().then((res) => {
    handleSave(res)
  }).catch((e) => {
    console.error(e)
    message.error(t('formValidateError'))
    modalLoading.value = false
  })
}

const formColumns = computed(() => {
  return props.columns.filter(item => item.dataIndex !== 'actions' && item.key !== 'actions' && (item.edit))
})

// 检查是否有列支持批量编辑
const hasBatchEditColumns = computed(() => {
  return props.columns.some(column => column.batchEdit === true)
})

// 当前弹窗的模式
const mode = ref<'add' | 'view' | 'edit'>('add')

// 回收站标记
const isTrash = ref(JSON.parse(route?.query?.trash as string ?? 'false'))

// 数据项详情
const itemDetail = ref<Record<string, any>>({})

// 表单错误
const errors = ref<Record<string, string>>({})

// 新增/编辑弹窗可见标记
const formVisible = ref(false)

// 表格 loading 和 弹窗 loading
const modalLoading = ref(false)

// 切换回收站和列表
function switchTrashAndList() {
  if (tableLoading.value)
    return

  isTrash.value = !isTrash.value

  refresh(true)
}

function getDataDetail(row: Record<string, any>) {
  modalLoading.value = true
  props.api.getItem(row[props.rowKey ?? 'id']).then((res) => {
    itemDetail.value = res
    modalLoading.value = false
  }).catch((e) => {
    console.error(e)
    message.error('Failed to get item detail')
  })
}

// 查看详情
function handleView(row: Record<string, any>) {
  emit('view', row)

  formVisible.value = true
  mode.value = 'view'
  getDataDetail(row)
}

// 打开添加弹窗
function handleAdd() {
  emit('add')

  formVisible.value = true
  mode.value = 'add'
  itemDetail.value = {}
}

// 打开编辑弹窗
async function handleEdit(row: Record<string, any>) {
  emit('editItem', row)

  // 如果父组件定义了 editItem handler，则不执行下面的逻辑
  if (instance?.vnode.props?.onEditItem) {
    return
  }

  getDataDetail(row)
  mode.value = 'edit'
  formVisible.value = true
}

// 保存新增/编辑数据
async function handleSave(data: Record<string, any>) {
  modalLoading.value = true

  if (props?.beforeSave) {
    const result = await props.beforeSave(data)
    if (!result) {
      modalLoading.value = false
      return
    }
  }

  const payload = {
    ...data,
    ...props.overwriteParams,
  }

  let promise: Promise<unknown>
  if (mode.value === 'add') {
    promise = props.api.createItem(payload, {
      params: props.overwriteParams,
    })
  }
  else {
    promise = props.api.updateItem(itemDetail.value[props.rowKey ?? 'id'], payload, {
      params: props.overwriteParams,
    })
  }

  promise
    .then(() => {
      refresh()
      formVisible.value = false
      message.success(t('savedSuccessfully'))
    })
    .catch((e) => {
      console.error(e)
      errors.value = e.errors
      message.error('Failed to save data')
    })
    .finally(() => (modalLoading.value = false))
}

// 处理删除/恢复数据
function handleDataById(action: string, record: Record<string, any>) {
  const apiKey = action.startsWith('delete') ? 'deleteItem' : 'restoreItem'
  emit(action as any, record)

  props.api[apiKey](record[props.rowKey ?? 'id'], {
    permanent: action === ApiActions.DELETE_ITEM_PERMANENTLY,
    ...props.overwriteParams,
  })
    .then(() => {
      refresh()
      if (apiKey === 'deleteItem')
        message.success(t('deletedSuccessfully'))
      else
        message.success(t('restoredSuccessfully'))
    })
    .catch((e) => {
      console.error(e)
      message.error('Failed to execute the operation')
    })
}

const { exportExcel, state: exportColumnsSelectionState, onCheckAllChange } = useExport({
  columns: props.columns,
  api: props.api?.getList,
})
const exportVisible = ref(false)

// 批量编辑
function handleBatchEdit() {
  if (selectedRowKeys.value.length === 0) {
    message.warning(t('pleaseSelectAtLeastOneItem'))
    return
  }
  stdBatchEdit.value?.showModal(selectedRowKeys.value, selectedRows.value)
}

// 批量编辑保存后的回调
function onBatchEditSave() {
  refresh()
  // 清空选中项
  selectedRowKeys.value = reactive([])
  selectedRows.value = reactive([])
}

defineExpose({
  refresh,
})

const title = computed(() => {
  return getRealContent(props.title) || t('list')
})

const modalTitle = computed(() => {
  if (mode.value === 'add')
    return t('add')
  if (mode.value === 'view')
    return t('view')
  return t('edit')
})
</script>

<template>
  <Card>
    <template
      v-if="!hideHeader && !hideTitle"
      #title
    >
      <slot name="titleLeft" />
      <slot name="title">
        {{ title }}
      </slot>
      <slot name="titleRight" />
    </template>
    <template
      v-if="!hideHeader && !hideExtra"
      #extra
    >
      <Flex
        align="center"
        gap="8"
      >
        <slot name="beforeListActions" />
        <a
          v-if="!disableExport && !isTrash"
          :class="{ 'cursor-not-allowed text-truegray-3 hover:text-truegray-3': selectedRowKeys.length === 0 }"
          @click="selectedRowKeys.length > 0 && (exportVisible = true)"
        >
          {{ t('exportExcel') }}
        </a>
        <a
          v-if="!disableAdd && !isTrash"
          @click="handleAdd"
        >{{ t('add') }}</a>
        <a
          v-if="!disableTrash"
          :class="{ 'cursor-not-allowed text-truegray-3 hover:text-truegray-3': tableLoading }"
          @click="switchTrashAndList"
        >
          {{ isTrash ? t('backToList') : t('trash') }}
        </a>
        <slot name="afterListActions" />
      </Flex>
    </template>
    <slot name="beforeCardBody" />
    <StdTable
      v-model:table-loading="tableLoading"
      v-model:selected-row-keys="selectedRowKeys"
      v-model:selected-rows="selectedRows"
      :title
      :columns
      :get-list-api="api.getList"
      :is-trash
      :disable-add
      :disable-edit
      :disable-delete
      :disable-search
      :disable-trash
      :disable-view
      :disable-router-query
      :row-selection-type
      :row-draggable
      :row-draggable-options
      :refresh-config
      :show-search-btn
      :hide-reset-btn
      :search-form-extra-render
      :table-props="{
        rowKey,
        scroll: {
          x: scrollX ?? 'max-content',
          y: scrollY,
        },
        ...tableProps,
      }"
      :overwrite-params="overwriteParams"
      :custom-query-params="customQueryParams"
      @view="handleView"
      @edit-item="handleEdit"
      @delete-item-temporarily="row => handleDataById(ApiActions.DELETE_ITEM_TEMPORARY, row)"
      @delete-item-permanently="row => handleDataById(ApiActions.DELETE_ITEM_PERMANENTLY, row)"
      @restore-item="row => handleDataById(ApiActions.RESTORE_ITEM, row)"
    >
      <template #beforeSearch="data">
        <slot
          name="beforeSearch"
          :data="data"
        />
      </template>
      <template #searchFormAction>
        <slot name="searchFormAction" />
        <Button
          v-if="hasBatchEditColumns && !isTrash"
          :class="{ 'cursor-not-allowed text-truegray-3 hover:text-truegray-3': selectedRowKeys.length === 0 }"
          @click="handleBatchEdit"
        >
          {{ t('batchEdit') }}
        </Button>
      </template>
      <template #beforeTable>
        <slot name="beforeTable" />
      </template>
      <template #beforeActions="{ record, column }">
        <slot
          name="beforeActions"
          :record="record"
          :column="column"
        />
      </template>
      <template #afterActions="{ record, column }">
        <slot
          name="afterActions"
          :record="record"
          :column="column"
        />
      </template>
    </StdTable>

    <Modal
      v-model:open="formVisible"
      destroy-on-close
      :closable="!modalLoading"
      :width="modalWidth"
      :title="modalTitle"
      :mask-closable="false"
    >
      <Spin :spinning="modalLoading">
        <div>
          <StdDetail
            v-if="mode === 'view'"
            :row-key
            :columns
            :record="itemDetail"
            :detail-props
          />
          <template v-else-if="mode === 'edit' || mode === 'add'">
            <slot
              name="beforeForm"
              :record="itemDetail"
            />
            <StdForm
              ref="stdForm"
              v-model:data="itemDetail"
              :errors
              :columns="formColumns"
              :form-class
              :form-row-props
            />
            <slot
              name="afterForm"
              :record="itemDetail"
            />
          </template>
        </div>
      </Spin>
      <template #footer>
        <Button
          :disabled="modalLoading"
          @click="formVisible = false"
        >
          {{ t('close') }}
        </Button>
        <Button
          v-show="mode !== 'view'"
          :loading="modalLoading"
          type="primary"
          @click="onSave"
        >
          {{ t('save') }}
        </Button>
      </template>
    </Modal>

    <Modal
      v-model:open="exportVisible"
      style="max-height: 80vh"
      :closable="!modalLoading"
      :width="props.modalWidth"
      :title="t('exportExcel')"
      :ok-text="t('ok')"
      @ok="exportExcel(selectedRowKeys, selectedRows)"
    >
      <Checkbox
        v-model:checked="exportColumnsSelectionState.checkAll"
        :indeterminate="exportColumnsSelectionState.indeterminate"
        @change="onCheckAllChange"
      >
        {{ t('selectAll') }}
      </Checkbox>
      <Divider />
    </Modal>
  </Card>

  <!-- 批量编辑组件 -->
  <StdBatchEdit
    ref="stdBatchEdit"
    :api="api"
    :columns="columns"
    :form-row-props="formRowProps"
    @save="onBatchEditSave"
  />
</template>
