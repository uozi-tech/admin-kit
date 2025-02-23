<script setup lang="ts">
import type { FilterValue, SorterResult, TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { TablePaginationConfig } from 'ant-design-vue/lib/table/interface'
import type { VNode } from 'vue'
import type { StdTableBodyScope, StdTableHeaderScope, StdTableProps } from '../types'
import { HolderOutlined } from '@ant-design/icons-vue'
import { Button, Flex, Popconfirm, Table } from 'ant-design-vue'
import { cloneDeep, debounce, get, isArray, isEqual, isObject } from 'lodash-es'
import { computed, h, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { getRealContent } from '..'
import useCurdConfig from '../composables/useCurdConfig'
import useDraggableTable from '../composables/useDraggableTable'
import StdSearch from './StdSearch.vue'

const props = defineProps<StdTableProps>()

const emit = defineEmits<{
  (e: 'change', payload: { pagination: TablePaginationConfig, filters: Record<string, FilterValue>, sorter: SorterResult | SorterResult<any>[] }): void
  (e: 'view', record: any): void
  (e: 'editItem', record: any): void
  (e: 'deleteItemTemporarily', record: any): void
  (e: 'restoreItem', record: any): void
  (e: 'deleteItemPermanently', record: any): void
}>()

const { randomId, initSortable, buildIndexMap, resetIndexMap } = useDraggableTable()

onMounted(() => {
  initSortable(tableData)
  debouncedListApi()
})

const tableLoading = defineModel<boolean>('tableLoading')

const router = useRouter()
const route = useRoute()

const { t } = useI18n()

const curdConfig = useCurdConfig()
const pagination = ref<TablePaginationConfig>(initializePagination(props.tableProps?.pagination))

function initializePagination(paginationProps: any): TablePaginationConfig {
  return {
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: true,
    responsive: true,
    showTotal: (total: number) => `${t('total')}: ${total} ${t('item(s)')}`,
    ...paginationProps,
  }
}

const computedColumns = computed(() => {
  return props.columns
    .map(item => ({
      ...item,
      title: getRealContent(item.title),
    }))
})
/** 筛选 table 显示的列，并且获取 title 真实内容 */
const dataColumns = computed<any>(() => {
  const cols = computedColumns.value
    .filter(item => !item.hiddenInTable)
  if (props.rowDraggable) {
    cols.unshift({
      title: '',
      dataIndex: 'drag',
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
    [curdConfig.listApi?.paginationMap?.current ?? 'page']: pagination.value.current ?? 1,
    [curdConfig.listApi?.paginationMap?.pageSize ?? 'page_size']: pagination.value?.pageSize ?? 20,
    ...customQueryParams,
    overwriteParams,
  }
})

// 更新锁，用于防止同步 route query 到 api params 时死循环
let isUpdatedFromApiParams = false

// 更新路由 query，加入防抖是为了频繁触发时合并更新
const debouncedUpdateRouteQuery = debounce(async (newQuery: Record<string, any>) => {
  isUpdatedFromApiParams = true
  await router.push({ query: { ...newQuery } })
  isUpdatedFromApiParams = false
}, 200, { leading: false, trailing: true })

// 搜索后重置分页页码
watch(searchFormData, () => {
  pagination.value.current = 1
  // debouncedUpdateRouteQuery({
  //   page: 1,
  //   page_size: pagination.value.pageSize,
  // })
}, { deep: true })

// route query 改变并且不是由 debouncedUpdateRouteQuery 触发的情况下，才同步到 apiParams
watch(() => route?.query, (v) => {
  if (isUpdatedFromApiParams)
    return
  pagination.value.current = Number(v.page) || 1
  pagination.value.pageSize = Number(v.page_size) || 20
  searchColumns.value.forEach((c) => {
    const dataIndex = c.dataIndex
    let key = dataIndex
    if (isObject(c.search) && c.search.formItem?.name) {
      key = c.search.formItem.name
    }

    if (isArray(key)) {
      key = key.join('.')
    }

    searchFormData.value[key] = v[key]
  })
}, { deep: true, immediate: true })

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
  if (Object.keys(searchFormData.value).length === 0)
    return

  searchFormData.value = {}
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
    const paginationPath = curdConfig.listApi?.paginationPath || '$.pagination'
    const paginationData = get(formattedRes, paginationPath.replace(/^\$\./, ''))
    const { total, current, pageSize } = curdConfig.listApi!.paginationMap!

    // 更新分页信息
    if (paginationData) {
      if (paginationData[total])
        pagination.value.total = paginationData[total]
      if (paginationData[current])
        pagination.value.current = paginationData[current]
      if (paginationData[pageSize])
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
    const { overwriteParams: _, ...rest } = newVal
    await debouncedUpdateRouteQuery({ ...route.query, ...rest })
  }
  tableData.value = []
  await debouncedListApi()
}, { deep: true })

/** Table 选择 */
const selectedRowKeys = defineModel<any[]>('selectedRowKeys')
const selectedRows = defineModel<any[]>('selectedRows')

function onSelectedChange(keys: (string | number)[], rows: Record<string | number, unknown>[]) {
  selectedRowKeys.value = keys
  selectedRows.value = rows
}

const rowSelection = computed(() => {
  if (props.rowSelectionType) {
    return {
      selectedRowKeys,
      onChange: onSelectedChange,
      type: props.rowSelectionType,
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

function onDeleteBtnClick(record: any) {
  emit('deleteItemTemporarily', record)
}

function onRestoreBtnClick(record: any) {
  emit('restoreItem', record)
}

function onDeletePermanentlyBtnClick(record: any) {
  emit('deleteItemPermanently', record)
}

/** Table header 渲染函数 */
function CustomHeaderRender(props: { node: VNode }) {
  return props.node
}

defineExpose({
  refresh: debouncedListApi,
})
</script>

<template>
  <div>
    <slot name="beforeSearch" />
    <StdSearch
      v-if="!props.disableSearch"
      v-model:data="searchFormData"
      class="mb-6"
      :columns="searchColumns"
    >
      <template #extra="{ formData }">
        <Flex
          wrap="wrap"
          gap="small"
        >
          <Button
            v-if="searchColumns.length"
            @click="resetSearchForm"
          >
            {{ t('reset') }}
          </Button>
          <slot
            name="searchFormAction"
            :form-data="formData"
          />
        </Flex>
      </template>
    </StdSearch>
    <slot name="beforeTable" />
    <Table
      :id="`std-table-${randomId}`"
      v-model:pagination="pagination"
      :row-selection="rowSelection"
      :columns="dataColumns"
      :data-source="tableData"
      :loading="tableLoading"
      v-bind="tableProps"
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
            :record="record"
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
          <Popconfirm
            v-if="!disableDelete && !isTrash"
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
          <Popconfirm
            v-if="!disableDelete && isTrash"
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
          <slot
            name="afterActions"
            :record="record"
            :column="column"
          />
        </template>
      </template>
    </Table>
  </div>
</template>

<style scoped lang="less">
:deep(.ant-table-drag-icon) {
  float: left;
  margin-right: 16px;
  cursor: grab;
}

.sortable-ghost *, .sortable-chosen * {
  cursor: grabbing !important;
}
</style>
