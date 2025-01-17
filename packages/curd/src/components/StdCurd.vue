<script setup lang="ts">
import type { StdCurdProps } from '~/types'
import { Button, Card, Checkbox, Divider, Flex, message, Modal, Spin } from 'ant-design-vue'
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import { computed, reactive, ref, useSlots, useTemplateRef, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useExport } from '~/composables'
import { ApiActions } from '~/constants'
import { $gettext, gettext } from '~/locales'
import { getRealContent } from '~/utils'
import StdDetail from './StdDetail.vue'
import StdForm from './StdForm.vue'
import StdTable from './StdTable.vue'

const props = defineProps<StdCurdProps>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'read', record: any): void
  (e: 'editItem', record: any): void
  (e: 'deleteItemTemporarily', record: any): void
  (e: 'restoreItem', record: any): void
  (e: 'deleteItemPermanently', record: any): void
}>()

const route = useRoute()
const slots = useSlots()
const refStdTable = useTemplateRef('refStdTable')

const { locale: lang } = useConfigContextInject()
watchEffect(() => {
  gettext.current = lang?.value.locale ?? 'zh-cn'
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
  }).catch(() => {
    message.error($gettext('Please fill all fields correctly'))
  })
}

const formColumns = computed(() => {
  return props.columns.filter(item => item.dataIndex !== 'actions' && item.key !== 'actions' && (item.edit))
})

// 当前弹窗的模式
const mode = ref<'add' | 'read' | 'edit'>('add')

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
  }).catch(() => {
    message.error('Failed to get item detail')
  })
}

// 查看详情
function handleRead(row: Record<string, any>) {
  emit('read', row)

  formVisible.value = true
  mode.value = 'read'
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
    promise = props.api.create(payload)
  }
  else {
    promise = props.api.update(itemDetail.value[props.rowKey ?? 'id'], payload)
  }

  promise
    .then(() => {
      refresh()
      formVisible.value = false
      message.success($gettext('Saved successfully'))
    })
    .catch(() => {
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
        message.success($gettext('Deleted successfully'))
      else
        message.success($gettext('Restored successfully'))
    })
    .catch(() => {
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
</script>

<template>
  <Card>
    <template #title>
      {{ getRealContent(props.title) || $gettext('List') }}
      <slot name="titleRight" />
    </template>
    <template #extra>
      <Flex gap="8">
        <slot name="beforeListActions" />
        <a
          v-if="!props.disableExport && !isTrash"
          :class="{ 'cursor-not-allowed text-truegray-3 hover:text-truegray-3': selectedRowKeys.length === 0 }"
          @click="selectedRowKeys.length > 0 && (exportVisible = true)"
        >
          {{ $gettext('Export Excel') }}
        </a>
        <a
          v-if="!props.disableAdd && !isTrash"
          @click="handleAdd"
        >{{ $gettext('Add') }}</a>
        <a
          v-if="!props.disableTrash"
          :class="{ 'cursor-not-allowed text-truegray-3 hover:text-truegray-3': tableLoading }"
          @click="switchTrashAndList"
        >
          {{ isTrash ? $gettext('Back to List') : $gettext('Trash') }}
        </a>
        <slot name="afterListActions" />
      </Flex>
    </template>

    <StdTable
      ref="refStdTable"
      v-model:table-loading="tableLoading"
      :title
      :columns
      :api
      :is-trash="isTrash"
      :disable-add="disableAdd"
      :disable-edit="disableEdit"
      :disable-delete="disableDelete"
      :disable-search="disableSearch"
      :disable-trash="disableTrash"
      :disable-router-query="disableRouterQuery"
      :row-selection-type="rowSelectionType"
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
      @read="handleRead"
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
      :title="mode === 'add' ? $gettext('Add') : $gettext('Edit')"
      :mask-closable="false"
    >
      <Spin :spinning="modalLoading">
        <div>
          <StdDetail
            v-if="mode === 'read'"
            :row-key="props.rowKey"
            :columns="props.columns"
            :record="itemDetail"
          />
          <StdForm
            v-else
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
          {{ $gettext('Close') }}
        </Button>
        <Button
          v-show="mode !== 'read'"
          :loading="modalLoading"
          type="primary"
          @click="onSave"
        >
          {{ $gettext('Save') }}
        </Button>
      </template>
    </Modal>

    <Modal
      v-model:open="exportVisible"
      style="max-height: 80vh"
      :closable="!modalLoading"
      :width="props.modalWidth"
      :title="$gettext('app.exportExcel')"
      :ok-text="$gettext('app.ok')"
      @ok="exportExcel(selectedRowKeys, selectedRows)"
    >
      <Checkbox
        v-model:checked="exportColumnsSelectionState.checkAll"
        :indeterminate="exportColumnsSelectionState.indeterminate"
        @change="onCheckAllChange"
      >
        {{ $gettext('app.selectAll') }}
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
