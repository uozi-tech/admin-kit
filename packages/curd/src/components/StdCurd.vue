<script setup lang="ts">
import type { StdCurdProps } from '../types'
import { Button, Card, Checkbox, Divider, Flex, message, Modal, Spin } from 'ant-design-vue'
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import { computed, reactive, ref, useSlots, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useExport } from '../composables'
import { ApiActions } from '../constants'
import { getRealContent } from '../utils'
import StdDetail from './StdDetail.vue'
import StdForm from './StdForm.vue'
import StdTable from './StdTable.vue'

const props = defineProps<StdCurdProps>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'view', record: any): void
  (e: 'editItem', record: any): void
  (e: 'deleteItemTemporarily', record: any): void
  (e: 'restoreItem', record: any): void
  (e: 'deleteItemPermanently', record: any): void
}>()

const route = useRoute()
const slots = useSlots()
const { t, locale } = useI18n()
const { locale: lang } = useConfigContextInject()

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

const selectedRowKeys = ref<(string | number)[]>([])
const selectedRows = ref<Record<string | number, unknown>[]>([])

const stdForm = ref()

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

// 当前弹窗的模式
const mode = ref<'add' | 'view' | 'edit'>('add')

// 回收站标记
const isTrash = ref(JSON.parse(route?.query?.trash as string ?? 'false'))

// 数据项详情
const itemDetail = ref<Record<string, any>>({})

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
function handleEdit(row: Record<string, any>) {
  emit('editItem', row)

  formVisible.value = true
  mode.value = 'edit'
  getDataDetail(row)
}

// 保存新增/编辑数据
function handleSave(data: Record<string, any>) {
  modalLoading.value = true
  const payload = {
    ...data,
    ...props.overwriteParams,
  }

  let promise: Promise<unknown>
  if (mode.value === 'add') {
    promise = props.api.createItem(payload)
  }
  else {
    promise = props.api.updateItem(itemDetail.value[props.rowKey ?? 'id'], payload)
  }

  promise
    .then(() => {
      refresh()
      formVisible.value = false
      message.success(t('savedSuccessfully'))
    })
    .catch((e) => {
      console.error(e)
      message.error('Failed to save data')
    })
    .finally(() => (modalLoading.value = false))
}

// 处理删除/恢复数据
function handleDataById(action: string, record: Record<string, any>) {
  const apiKey = action.startsWith('delete') ? 'deleteItem' : 'restoreItem'
  emit(action as any, record)

  props.api[apiKey](record[props.rowKey ?? 'id'], { permanently: action === ApiActions.DELETE_ITEM_PERMANENTLY })
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

const { exportExcel, exportColumns, state: exportColumnsSelectionState, onCheckAllChange } = useExport({
  columns: props.columns,
  api: props.api?.getList,
})
const exportVisible = ref(false)

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
      <Flex gap="8">
        <slot name="beforeListActions" />
        <a
          v-if="!props.disableExport && !isTrash"
          :class="{ 'cursor-not-allowed text-truegray-3 hover:text-truegray-3': selectedRowKeys.length === 0 }"
          @click="selectedRowKeys.length > 0 && (exportVisible = true)"
        >
          {{ t('exportExcel') }}
        </a>
        <a
          v-if="!props.disableAdd && !isTrash"
          @click="handleAdd"
        >{{ t('add') }}</a>
        <a
          v-if="!props.disableTrash"
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
      :title
      :columns
      :get-list-api="api.getList"
      :is-trash="isTrash"
      :disable-add="disableAdd"
      :disable-edit="disableEdit"
      :disable-delete="disableDelete"
      :disable-search="disableSearch"
      :disable-trash="disableTrash"
      :disable-view="disableView"
      :disable-router-query="disableRouterQuery"
      :row-selection-type="rowSelectionType"
      :row-draggable="rowDraggable"
      :row-draggable-options="rowDraggableOptions"
      :refresh-config="refreshConfig"
      :table-props="{
        rowKey,
        scroll: {
          x: props.scrollX ?? 'max-content',
          y: props.scrollY,
        },
        ...props.tableProps,
      }"
      :overwrite-params="overwriteParams"
      :custom-query-params="customQueryParams"
      @view="handleView"
      @edit-item="handleEdit"
      @delete-item-temporarily="row => handleDataById(ApiActions.DELETE_ITEM_TEMPORARY, row)"
      @delete-item-permanently="row => handleDataById(ApiActions.DELETE_ITEM_PERMANENTLY, row)"
      @restore-item="row => handleDataById(ApiActions.RESTORE_ITEM, row)"
    >
      <template
        v-for="(_, key) in slots"
        :key="key"
        #[key]="slotProps"
      >
        <slot
          :name="key"
          v-bind="slotProps"
        />
      </template>
    </StdTable>

    <Modal
      v-model:open="formVisible"
      destroy-on-close
      :closable="!modalLoading"
      :width="props.modalWidth"
      :title="modalTitle"
      :mask-closable="false"
    >
      <Spin :spinning="modalLoading">
        <div>
          <StdDetail
            v-if="mode === 'view'"
            :row-key="props.rowKey"
            :columns="props.columns"
            :record="itemDetail"
          />
          <StdForm
            v-else-if="mode === 'edit'"
            ref="stdForm"
            :data="itemDetail"
            :columns="formColumns"
          />
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
          v-show="mode !== 'read'"
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
      <!--      <VueDraggable class="checkbox__wrapper" v-model="exportColumns" :animation="200"> -->
      <!--        <a-checkbox -->
      <!--          v-for="(c, i) in exportColumns" -->
      <!--          :key="c.dataIndex" -->
      <!--          class="checkbox" -->
      <!--          :checked="exportColumns[i].checked" -->
      <!--          @change="(event) => (exportColumns[i].checked = event.target.checked)" -->
      <!--        > -->
      <!--          {{ c.title }} -->
      <!--        </a-checkbox> -->
      <!--      </VueDraggable> -->
    </Modal>
  </Card>
</template>

<style scoped>

</style>
