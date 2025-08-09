<script setup lang="ts">
import type { FilterValue, SorterResult, TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { TablePaginationConfig } from 'ant-design-vue/lib/table/interface'
import type { VNode } from 'vue'
import type { StdTableBodyScope, StdTableHeaderScope, StdTableProps } from '../types'
import { HolderOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { Button, Popconfirm, Table } from 'ant-design-vue'
import { cloneDeep, debounce, get, isArray, isEqual, isNil, isObject } from 'lodash-es'
import { computed, h, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRealContent } from '..'
import { useLocale } from '../composables'
import useCurdConfig from '../composables/useCurdConfig'
import useDraggableTable from '../composables/useDraggableTable'
import DeleteConfirmModal from './DeleteConfirmModal.vue'
import StdSearch from './StdSearch.vue'
import TableColumnSettings from './TableColumnSettings.vue'

const props = defineProps<StdTableProps>()

const emit = defineEmits<{
  (e: 'change', payload: { pagination: TablePaginationConfig, filters: Record<string, FilterValue>, sorter: SorterResult | SorterResult<any>[] }): void
  (e: 'view', record: any): void
  (e: 'editItem', record: any): void
  (e: 'deleteItemTemporarily', record: any): void
  (e: 'restoreItem', record: any): void
  (e: 'deleteItemPermanently', record: any): void
}>()

const { tableId, initSortable, buildIndexMap, resetIndexMap } = useDraggableTable(props.rowDraggableOptions)

onMounted(() => {
  syncSearchFormDataFromRouteQuery()
  initSortable(tableData)
  debouncedListApi()
})

const tableLoading = defineModel<boolean>('tableLoading')

const router = useRouter()
const route = useRoute()

const { t } = useLocale()

const curdConfig = useCurdConfig()
const pagination = ref<TablePaginationConfig>(initializePagination(props.tableProps?.pagination))

function initializePagination(paginationProps: any): TablePaginationConfig {
  return {
    current: route.query[curdConfig.listApi!.paginationMap!.params!.current!] ?? 1,
    pageSize: route.query[curdConfig.listApi!.paginationMap!.params!.pageSize!] ?? 20,
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: false,
    responsive: true,
    showTotal: (total: number) => `${t('total')}: ${total} ${t('item(s)')}`,
    ...paginationProps,
  }
}

function syncSearchFormDataFromRouteQuery() {
  const v = route.query
  pagination.value.current = Number(v[curdConfig.listApi!.paginationMap!.params!.current!]) || 1
  pagination.value.pageSize = Number(v[curdConfig.listApi!.paginationMap!.params!.pageSize!]) || 20
  searchColumns.value.forEach((c) => {
    const dataIndex = c.dataIndex
    let key = dataIndex
    if (isObject(c.search) && c.search.formItem?.name) {
      key = c.search.formItem.name
    }

    if (isArray(key)) {
      key = key.join('.')
    }

    if (v[key] === 'true') {
      searchFormData.value[key] = true
    }
    else if (v[key] === 'false') {
      searchFormData.value[key] = false
    }
    else {
      searchFormData.value[key] = v[key]
    }
  })

  // 监听 search form 数据变化，如果数据变化，则重置分页
  watch(() => searchFormData.value, () => {
    pagination.value.current = 1
  }, { deep: true })
}

// 列设置相关状态
const displayColumns = ref<any[]>([])

const computedColumns = computed(() => {
  return props.columns
    .map(item => ({
      ...item,
      title: getRealContent(item.title),
    }))
})

// 处理列设置变化
function onColumnSettingsChange(newColumns: any[]) {
  displayColumns.value = newColumns
}
/** 筛选 table 显示的列，并且获取 title 真实内容 */
const dataColumns = computed<any>(() => {
  // 使用列设置的结果，如果没有设置则使用默认的
  const baseColumns = computedColumns.value.filter(item => !item.hiddenInTable)

  const cols = [...baseColumns]

  if (props.rowDraggable) {
    cols.unshift({
      title: '',
      dataIndex: 'drag',
      width: 80,
      align: 'center',
      customRender: () => {
        return h(HolderOutlined, { class: 'ant-table-drag-icon' })
      },
    })
  }
  return cols
})

const searchColumns = computed(() => {
  return computedColumns.value.filter(item => item?.search)
})

const searchFormData = ref<Record<string, any>>({
  sort_by: undefined,
  order: undefined,
})

const apiParams = computed(() => {
  const overwriteParams = cloneDeep(props.overwriteParams)
  const customQueryParams = cloneDeep(props.customQueryParams)

  return {
    ...searchFormData.value,
    trash: props.isTrash,
    [curdConfig.listApi!.paginationMap!.params!.current!]: pagination.value.current ?? 1,
    [curdConfig.listApi!.paginationMap!.params!.pageSize!]: pagination.value?.pageSize ?? 20,
    ...customQueryParams,
    overwriteParams,
  }
})

// 更新路由 query，加入防抖是为了频繁触发时合并更新
const debouncedUpdateRouteQuery = debounce(async (newQuery: Record<string, any>) => {
  await router.replace({ query: { ...newQuery } })
}, 200, { leading: false, trailing: true })

watch(() => props.refreshConfig, () => {
  if (!props.refreshConfig?.timestamp) {
    return
  }
  if (props.refreshConfig?.reset) {
    resetSearchForm()
  }
  debouncedListApi()
}, { deep: true })

// 重置搜索表单
async function resetSearchForm() {
  const searchKeys = Object.keys(searchFormData.value)
  if (searchKeys.length === 0)
    return

  const query = cloneDeep(route.query)
  for (const key of searchKeys) {
    delete query[key]
  }
  await router.replace({ query })

  searchFormData.value = {}

  pagination.value.current = 1
}

// 表格数据
const tableData = ref<Record<string, any>[]>([])
const debouncedListApi = debounce(async () => {
  tableLoading.value = true

  const { overwriteParams, ...rest } = apiParams.value
  let finialParams: Record<string, any> = { ...rest, ...overwriteParams }

  // 格式化请求参数
  if (curdConfig.listApi?.requestFormat) {
    finialParams = curdConfig.listApi.requestFormat(finialParams)
  }

  try {
    const res = await props.getListApi(finialParams)
    let formattedRes = res

    // 格式化响应数据
    if (curdConfig.listApi?.responseFormat) {
      formattedRes = curdConfig.listApi.responseFormat(res)
    }

    // 获取分页数据
    const paginationPath = curdConfig.listApi.paginationPath!
    const paginationData = get(formattedRes, paginationPath.replace(/^\$\./, ''))
    const { total, current, pageSize } = curdConfig.listApi!.paginationMap!.response

    // 更新分页信息
    if (paginationData) {
      if (!isNil(paginationData[total]))
        pagination.value.total = paginationData[total]
      if (!isNil(paginationData[current]))
        pagination.value.current = paginationData[current]
      if (!isNil(paginationData[pageSize]))
        pagination.value.pageSize = paginationData[pageSize]
    }

    // 更新表格数据
    tableData.value = formattedRes.data

    if (props.rowDraggable) {
      resetIndexMap()
      buildIndexMap(tableData.value)
    }
  }
  finally {
    tableLoading.value = false
  }
}, 200, { leading: false, trailing: true })

// apiParams 改变时，同步到 route query，并重新请求数据
watch(apiParams, async (newVal, oldVal) => {
  // apiParams 是个 Object，可能存在 Object 指针发生变化，实际内部属性没有变化的情况
  // 如果内部属性没有变化，则不触发请求
  if (isEqual(newVal, oldVal)) {
    return
  }
  if (!props.disableRouterQuery) {
    // overwriteParams 不同步到 route query
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { overwriteParams: _, ...rest } = newVal
    const query = cloneDeep(route.query)
    await debouncedUpdateRouteQuery({ ...query, ...rest })
  }
  tableData.value = []
  await debouncedListApi()
}, { deep: true })

watch(() => props.getListApi, () => {
  debouncedListApi()
})

/** Table 选择 */
const selectedRowKeys = defineModel<any[]>('selectedRowKeys')
const selectedRows = defineModel<any[]>('selectedRows')

// 删除确认 Modal 相关状态
const deleteModalVisible = ref(false)
const deleteModalRecord = ref<any>(null)
const deleteModalType = ref<'temporary' | 'permanent'>('temporary')

function onSelectedChange(keys: (string | number)[], rows: Record<string | number, unknown>[]) {
  selectedRowKeys.value = keys
  selectedRows.value = rows
}

const rowSelection = computed(() => {
  if (props.rowSelectionType || props.rowSelection || props.tableProps?.rowSelection) {
    return {
      selectedRowKeys,
      onChange: onSelectedChange,
      type: props.rowSelectionType || 'radio',
      ...props.rowSelection,
      ...props.tableProps?.rowSelection,
    } as unknown as TableRowSelection<any>
  }
  return undefined
})

/** Table 分页，排序，筛选发生改变时触发 */
function onTableChange(p: TablePaginationConfig, filters: Record<string, FilterValue>, sorter: SorterResult | SorterResult<any>[]) {
  emit('change', { pagination: p, filters, sorter })

  if (sorter) {
    if (isArray(sorter)) {
      sorter = sorter[0]
    }
    selectedRowKeys.value = []
    searchFormData.value.sort_by = sorter.field
    switch (sorter.order) {
      case 'ascend':
        searchFormData.value.order = 'asc'
        break
      case 'descend':
        searchFormData.value.order = 'desc'
        break
      default:
        searchFormData.value.order = undefined
        break
    }
  }
  if (filters) {
    Object.keys(filters).forEach((v: string) => {
      searchFormData.value[v] = filters[v]
    })
  }

  if (p) {
    selectedRowKeys.value = []
    pagination.value.current = p.current
    pagination.value.pageSize = p.pageSize
  }
}

/**
 * 删改查相关 Emits
 */
function onViewBtnClick(record: any) {
  emit('view', record)
}

function onEditBtnClick(record: any) {
  emit('editItem', record)
}

const deletionConfig = computed(() => props.deleteConfirmConfig || curdConfig.deleteConfirmConfig)

function onDeleteBtnClick(record: any) {
  if (deletionConfig.value?.mode === 'modal') {
    deleteModalRecord.value = record
    deleteModalType.value = 'temporary'
    deleteModalVisible.value = true
  }
  else {
    emit('deleteItemTemporarily', record)
  }
}

function onRestoreBtnClick(record: any) {
  emit('restoreItem', record)
}

function onDeletePermanentlyBtnClick(record: any) {
  if (props.deleteConfirmConfig?.mode === 'modal') {
    deleteModalRecord.value = record
    deleteModalType.value = 'permanent'
    deleteModalVisible.value = true
  }
  else {
    emit('deleteItemPermanently', record)
  }
}

// 处理 Modal 确认删除
function handleModalDeleteConfirm(record: any) {
  if (deleteModalType.value === 'temporary') {
    emit('deleteItemTemporarily', record)
  }
  else {
    emit('deleteItemPermanently', record)
  }
  deleteModalVisible.value = false
}

/** Table header 渲染函数 */
function CustomHeaderRender(props: { node: VNode }) {
  return props.node
}

defineExpose({
  refresh: debouncedListApi,
  tableData,
})

function SearchFormExtraRender() {
  if (!props.searchFormExtraRender) {
    return null
  }
  return props?.searchFormExtraRender(searchFormData, searchColumns.value, props)
}
</script>

<template>
  <div>
    <slot name="beforeSearch" />
    <StdSearch
      v-if="!props.disableSearch"
      v-model:data="searchFormData"
      :show-search-btn
      :hide-reset-btn
      class="mb-6"
      :columns="searchColumns"
      @reset="resetSearchForm"
    >
      <template #extra="{ formData }">
        <slot
          name="searchFormAction"
          :form-data="formData as any"
        />
        <template v-if="searchFormExtraRender">
          <SearchFormExtraRender />
        </template>
      </template>
    </StdSearch>
    <slot name="beforeTable" />
    <div class="table-container">
      <div class="table-header">
        <div class="table-actions">
          <TableColumnSettings
            :columns="dataColumns"
            :table-id="tableId"
            @change="onColumnSettingsChange"
          />
          <Button
            type="text"
            size="small"
            :loading="tableLoading"
            :icon="h(ReloadOutlined)"
            @click="debouncedListApi"
          />
        </div>
      </div>
      <Table
        :id="`std-table-${tableId}`"
        v-model:pagination="pagination"
        :columns="dataColumns"
        :data-source="tableData"
        :loading="tableLoading"
        row-key="id"
        v-bind="{
          scroll: {
            x: 'max-content',
          },
          ...tableProps,
          rowSelection,
        }"
        @change="onTableChange"
      >
        <template #headerCell="{ title, column }: StdTableHeaderScope">
          <template v-if="column?.customHeaderRender">
            <CustomHeaderRender :node="column?.customHeaderRender({ title, column })" />
          </template>
        </template>
        <template #bodyCell="{ record, column }: StdTableBodyScope">
          <template v-if="!onlyQuery && column?.dataIndex === 'actions' && !column?.customRender">
            <slot
              name="beforeActions"
              :record="record as any"
              :column="column"
            />
            <Button
              v-if="!disableView && !isTrash"
              size="small"
              type="link"
              @click="onViewBtnClick(record)"
            >
              {{ t('view') }}
            </Button>
            <Button
              v-if="!disableEdit && !isTrash"
              size="small"
              type="link"
              @click="onEditBtnClick(record)"
            >
              {{ t('edit') }}
            </Button>
            <template v-if="!disableDelete && !isTrash">
              <Popconfirm
                v-if="!deletionConfig || deletionConfig.mode === 'popconfirm'"
                :title="t('deleteConfirm')"
                @confirm="onDeleteBtnClick(record)"
              >
                <Button
                  size="small"
                  type="link"
                  danger
                >
                  {{ t('delete') }}
                </Button>
              </Popconfirm>
              <Button
                v-else
                size="small"
                type="link"
                danger
                @click="onDeleteBtnClick(record)"
              >
                {{ t('delete') }}
              </Button>
            </template>
            <Popconfirm
              v-if="!disableTrash && isTrash"
              :title="t('restoreConfirm')"
              @confirm="onRestoreBtnClick(record)"
            >
              <Button
                size="small"
                type="link"
              >
                {{ t('restore') }}
              </Button>
            </Popconfirm>
            <template v-if="!disableDelete && isTrash">
              <Popconfirm
                v-if="!deleteConfirmConfig || deleteConfirmConfig.mode === 'popconfirm'"
                :title="t('deletePermanentlyConfirm')"
                @confirm="onDeletePermanentlyBtnClick(record)"
              >
                <Button
                  size="small"
                  type="link"
                  danger
                >
                  {{ t('deletePermanently') }}
                </Button>
              </Popconfirm>
              <Button
                v-else
                size="small"
                type="link"
                danger
                @click="onDeletePermanentlyBtnClick(record)"
              >
                {{ t('deletePermanently') }}
              </Button>
            </template>
            <slot
              name="afterActions"
              :record="record as any"
              :column="column"
            />
          </template>
        </template>
      </Table>
    </div>

    <!-- 删除确认 Modal -->
    <DeleteConfirmModal
      v-model:open="deleteModalVisible"
      :record="deleteModalRecord"
      :config="deletionConfig"
      @confirm="handleModalDeleteConfirm"
    />
  </div>
</template>

<style scoped lang="less">
:deep(.ant-table-drag-icon) {
  cursor: grab;
}

.sortable-ghost *, .sortable-chosen * {
  cursor: grabbing !important;
}

:deep(.ant-pagination-options .ant-select.ant-select-in-form-item) {
  width: fit-content;
}

.table-container {
  position: relative;
}

.table-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.table-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
