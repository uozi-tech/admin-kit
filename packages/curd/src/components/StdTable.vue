<script setup lang="ts">
import type { FilterValue, SorterResult, TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { TablePaginationConfig } from 'ant-design-vue/lib/table/interface'
import type { VNode } from 'vue'
import type { StdTableBodyScope, StdTableColumn, StdTableHeaderScope, StdTableProps } from '../types'
import { HolderOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { useRouteQuery } from '@vueuse/router'
import { Button, Popconfirm, Table } from 'ant-design-vue'
import { cloneDeep, debounce, get, isArray, isEqual, isNil } from 'lodash-es'
import { computed, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getRealContent } from '..'
import { useLocale } from '../composables'
import useCurdConfig from '../composables/useCurdConfig'
import useDraggableTable from '../composables/useDraggableTable'
import DeleteConfirmModal from './DeleteConfirmModal.vue'
import StdSearch from './StdSearch.vue'
import TableColumnSettings from './TableColumnSettings.vue'

const props = withDefaults(defineProps<StdTableProps>(), {
  showSearchBtn: undefined,
})

const emit = defineEmits<{
  (e: 'change', payload: { pagination: TablePaginationConfig, filters: Record<string, FilterValue>, sorter: SorterResult | SorterResult<any>[] }): void
  (e: 'view', record: any): void
  (e: 'editItem', record: any): void
  (e: 'deleteItemTemporarily', record: any): void
  (e: 'restoreItem', record: any): void
  (e: 'deleteItemPermanently', record: any): void
  (e: 'resetSearchForm'): void
}>()

const { tableId, initSortable, buildIndexMap, resetIndexMap } = useDraggableTable(props.rowDraggableOptions)

onMounted(async () => {
  try {
    // 等待下一帧确保 searchColumns 已经计算完成
    await nextTick()

    // 从 URL 的 search 参数中解析搜索条件
    if (searchQuery.value) {
      try {
        const parsedSearch = JSON.parse(searchQuery.value)
        if (parsedSearch && typeof parsedSearch === 'object') {
          searchFormData.value = { ...parsedSearch }
        }
      }
      catch {
        // 如果解析失败，保持空对象
        searchFormData.value = {}
      }
    }

    searchQuery.value = JSON.stringify(searchFormData.value)

    initSortable(tableData)
    debouncedListApi()

    // 标记初始化完成
    isInitialized.value = true
  }
  catch (error) {
    console.error('Error in onMounted:', error)
    // 即使初始化失败，也要执行必要的初始化
    initSortable(tableData)
    debouncedListApi()
    isInitialized.value = true
  }
})

const tableLoading = defineModel<boolean>('tableLoading')

const { t } = useLocale()

const curdConfig = useCurdConfig()

// 使用 useRouteQuery 管理分页参数
let currentPageParam: string
let pageSizeParam: string

try {
  currentPageParam = curdConfig.listApi?.paginationMap?.params?.current || 'page'
  pageSizeParam = curdConfig.listApi?.paginationMap?.params?.pageSize || 'pageSize'
}
catch {
  currentPageParam = 'page'
  pageSizeParam = 'pageSize'
}

const currentPage = useRouteQuery(currentPageParam, 1, {
  transform: Number,
  mode: 'replace',
})
const currentPageSize = useRouteQuery(pageSizeParam, 20, {
  transform: Number,
  mode: 'replace',
})

// 使用 useRouteQuery 管理排序参数
const sortBy = useRouteQuery<string | undefined>('sort_by', undefined, { mode: 'replace' })
const order = useRouteQuery<string | undefined>('order', undefined, { mode: 'replace' })

// 分页数据总数
const paginationTotal = ref<number>(0)

const pagination = computed<TablePaginationConfig>(() => ({
  current: currentPage.value,
  pageSize: currentPageSize.value,
  total: paginationTotal.value,
  showSizeChanger: true,
  showQuickJumper: true,
  hideOnSinglePage: false,
  responsive: true,
  showTotal: (total: number) => `${t('total')}: ${total} ${t('item(s)')}`,
  ...props.tableProps?.pagination,
}))

// 列设置相关状态
const displayColumns = ref<any[]>([])

const computedColumns = computed(() => {
  return props.columns
    .filter(item => !item?.hiddenInTable)
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
  const baseColumns = displayColumns.value.length > 0 ? displayColumns.value : computedColumns.value

  const cols = baseColumns.filter(item => !item?.hiddenInTable).map((item: StdTableColumn) => {
    if (item.dataIndex === sortBy.value) {
      switch (order.value) {
        case 'asc':
          item.sortOrder = 'ascend'
          break
        case 'desc':
          item.sortOrder = 'descend'
          break
        default:
          item.sortOrder = undefined
          break
      }
    }
    return item
  })

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

// 搜索表单数据 - 保持简单的响应式管理
const searchFormData = ref<Record<string, any>>({ ...props.customQueryParams })

// 监听 search form 数据变化，重置分页并序列化到单一参数
watch(searchFormData, async (newVal, oldVal) => {
  try {
    // 跳过初始化期间的变化
    if (!isInitialized.value)
      return
    if (isEqual(newVal, oldVal))
      return

    // 重置分页
    currentPage.value = 1

    // 同步搜索参数到路由
    if (!props.disableRouterQuery) {
      try {
        // 过滤掉空值
        const filteredSearch = Object.entries(newVal).reduce((acc, [key, value]) => {
          if (value !== '' && value !== undefined && value !== null) {
            acc[key] = value
          }
          return acc
        }, { ...props.customQueryParams } as Record<string, any>)

        // 如果有搜索条件，序列化为 JSON，否则清空
        if (Object.keys(filteredSearch).length > 0) {
          searchQuery.value = JSON.stringify(filteredSearch)
        }
        else {
          searchQuery.value = ''
        }
      }
      catch (serializeError) {
        console.error('Error serializing search parameters:', serializeError)
      }
    }
  }
  catch (error) {
    console.error('Error in searchFormData watcher:', error)
  }
})

// 监听 customQueryParams 变化
watch(() => props.customQueryParams, (newVal) => {
  searchFormData.value = { ...searchFormData.value, ...newVal }
}, { deep: true })

// 初始化标志，避免在初始化期间触发不必要的副作用
const isInitialized = ref(false)

// 使用单一的 search 参数存储所有搜索条件
const searchQuery = useRouteQuery<string>('search', '', { mode: 'replace' })

const apiParams = computed(() => {
  const overwriteParams = cloneDeep(props.overwriteParams)
  const customQueryParams = cloneDeep(props.customQueryParams)

  return {
    ...searchFormData.value,
    trash: props.isTrash,
    sort_by: order.value ? sortBy.value : undefined,
    order: order.value || undefined,
    [currentPageParam]: currentPage.value ?? 1,
    [pageSizeParam]: currentPageSize.value ?? 20,
    ...customQueryParams,
    overwriteParams,
  }
})

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
function resetSearchForm() {
  emit('resetSearchForm')
  if (Object.keys(searchFormData.value).length === 0)
    return

  searchFormData.value = {}
  searchQuery.value = ''
  currentPage.value = 1
}

// 表格数据
const tableData = ref<Record<string, any>[]>([])
function isRequestCanceled(error: any): boolean {
  // Axios v1 通过 AbortController 取消时的标准标识
  return error?.code === 'ERR_CANCELED'
}
// 仅保留最新的一次请求：新的请求到来时中断旧的请求
let listAbortController: AbortController | null = null
let latestRequestId = 0

const debouncedListApi = debounce(async () => {
  if (!props.getListApi) {
    return
  }

  tableLoading.value = true

  const { overwriteParams, ...rest } = apiParams.value
  let finialParams: Record<string, any> = { ...rest, ...overwriteParams }

  // 格式化请求参数
  if (curdConfig.listApi?.requestFormat) {
    finialParams = curdConfig.listApi.requestFormat(finialParams)
  }

  // 在发起新请求前，取消旧请求
  if (listAbortController)
    listAbortController.abort()

  listAbortController = new AbortController()
  const currentRequestId = ++latestRequestId

  try {
    const res = await props.getListApi(finialParams, { signal: listAbortController.signal })
    // 如果该响应不是最新请求的结果，则忽略
    if (currentRequestId !== latestRequestId)
      return
    let formattedRes = res

    // 格式化响应数据
    if (curdConfig.listApi?.responseFormat) {
      formattedRes = curdConfig.listApi.responseFormat(res)
    }

    // 获取分页数据
    const paginationPath = curdConfig.listApi?.paginationPath
    if (!paginationPath) {
      console.warn('paginationPath is not configured in curdConfig.listApi')
      return
    }

    const paginationData = get(formattedRes, paginationPath.replace(/^\$\./, ''))
    const paginationResponseMap = curdConfig.listApi?.paginationMap?.response
    if (!paginationResponseMap) {
      console.warn('paginationMap.response is not configured in curdConfig.listApi')
      return
    }

    const { total, current, pageSize } = paginationResponseMap

    // 更新分页信息
    if (paginationData) {
      if (!isNil(paginationData[total]))
        paginationTotal.value = paginationData[total]
      if (!isNil(paginationData[current]))
        currentPage.value = paginationData[current]
      if (!isNil(paginationData[pageSize]))
        currentPageSize.value = paginationData[pageSize]
    }

    // 更新表格数据
    tableData.value = formattedRes.data

    if (props.rowDraggable) {
      resetIndexMap()
      buildIndexMap(tableData.value)
    }
  }
  catch (error: any) {
    // 取消请求静默忽略；其他错误仅输出精简日志
    if (!isRequestCanceled(error))
      console.error('debouncedListApi error:', error?.message || error)
    // 非取消错误时，为避免闪烁，不清空既有数据
  }
  finally {
    // 仅当这是最新的一次请求时，才结束 loading 状态
    if (currentRequestId === latestRequestId && tableLoading?.value !== undefined)
      tableLoading.value = false
  }
}, 200, { leading: false, trailing: true })

// apiParams 改变时，重新请求数据
watch(apiParams, async (newVal, oldVal) => {
  // apiParams 是个 Object，可能存在 Object 指针发生变化，实际内部属性没有变化的情况
  // 如果内部属性没有变化，则不触发请求
  if (isEqual(newVal, oldVal)) {
    return
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
    sortBy.value = String(sorter.field || undefined)
    switch (sorter.order) {
      case 'ascend':
        order.value = 'asc'
        break
      case 'descend':
        order.value = 'desc'
        break
      default:
        order.value = undefined
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
    currentPage.value = p.current || 1
    currentPageSize.value = p.pageSize || 20
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

onBeforeUnmount(() => {
  if (listAbortController)
    listAbortController.abort()
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
      class="mb-4"
      :columns="searchColumns"
      @reset="resetSearchForm"
    >
      <template #search-actions-left>
        <slot name="search-actions-left" />
      </template>
      <template #extra="{ formData }">
        <slot
          name="searchFormAction"
          :form-data="(formData as any)"
        />
        <template v-if="searchFormExtraRender">
          <SearchFormExtraRender />
        </template>
        <TableColumnSettings
          :columns="computedColumns"
          :table-id="tableId"
          @change="onColumnSettingsChange"
        />
        <Button
          :loading="tableLoading"
          :icon="h(ReloadOutlined)"
          @click="debouncedListApi"
        />
      </template>
    </StdSearch>
    <slot name="beforeTable" />
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
        <!-- 通用列 slot 支持 -->
        <template v-if="$slots[`col-${column.dataIndex}`] && !column?.customRender">
          <slot
            :name="`col-${column.dataIndex}`"
            :record="(record as any)"
            :column="column"
            :text="record[column.dataIndex]"
            :value="record[column.dataIndex]"
            :index="record.index"
          />
        </template>
        <!-- Actions 列特殊处理 -->
        <template v-else-if="!onlyQuery && column?.dataIndex === 'actions' && !column?.customRender">
          <slot
            name="beforeActions"
            :record="(record as any)"
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
            :record="(record as any)"
            :column="column"
          />
        </template>
      </template>
    </Table>

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
