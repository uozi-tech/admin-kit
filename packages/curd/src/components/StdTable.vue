<script setup lang="ts">
import type { FilterValue, SorterResult, TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { TablePaginationConfig } from 'ant-design-vue/lib/table/interface'
import type { VNode } from 'vue'
import type { StdTableBodyScope, StdTableHeaderScope, StdTableProps } from '~/types'
import { Button, Flex, message, Popconfirm, Table } from 'ant-design-vue'
import { debounce, isArray, isEqual } from 'lodash-es'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $gettext, $pgettext } from '~/locales'
import { getRealContent } from '~/utils'
import StdSearch from './StdSearch.vue'

const props = defineProps<StdTableProps>()

const emit = defineEmits<{
  (e: 'read', record: any): void
  (e: 'editItem', record: any): void
  (e: 'deleteItemTemporarily', record: any): void
  (e: 'restoreItem', record: any): void
  (e: 'deleteItemPermanently', record: any): void
}>()

onMounted(() => {
  debouncedListApi()
})

const tableLoading = defineModel<boolean>('tableLoading')

const router = useRouter()
const route = useRoute()

const pagination = ref<TablePaginationConfig>(initializePagination(props.tableProps?.pagination))

function initializePagination(paginationProps: any): TablePaginationConfig {
  return {
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: true,
    responsive: true,
    showTotal: (total: number) => `${$gettext('Total')}: ${total} ${$pgettext('项', 'item(s)')}`,
    ...paginationProps,
  }
}

/** 筛选 table 显示的列，并且获取 title 真实内容 */
const dataColumns = computed<any>(() => {
  return props.columns
    .filter(item => !item.hiddenInTable)
    .map((item) => {
      item.title = getRealContent(item.title)
      return item
    })
})

const searchColumns = computed(() => {
  return props.columns.filter(item => item?.search)
})

const searchFormData = ref<Record<string, any>>({
  sort_by: undefined,
  order: undefined,
})
const apiParams = computed(() => ({
  ...searchFormData.value,
  trash: props.isTrash,
  page: pagination.value.current ?? 1,
  page_size: pagination.value?.pageSize ?? 20,
  ...props.customQueryParams,
  overwriteParams: props.overwriteParams,
}))

// 更新锁，用于防止同步 route query 到 api params 时死循环
let isUpdatedFromApiParams = false

// 更新路由 query，加入防抖是为了频繁触发时合并更新
const debouncedUpdateRouteQuery = debounce(async (newQuery: Record<string, any>) => {
  isUpdatedFromApiParams = true
  await router.push({ query: { ...newQuery } })
  isUpdatedFromApiParams = false
}, 200, { leading: false, trailing: true })

// 搜索后重置分页页码
watch(searchFormData, () => pagination.value.current = 1, { deep: true })

// route query 改变并且不是由 debouncedUpdateRouteQuery 触发的情况下，才同步到 apiParams
watch(() => route?.query, (v) => {
  if (isUpdatedFromApiParams)
    return
  pagination.value.current = Number(v.page) || 1
  pagination.value.pageSize = Number(v.page_size) || 20
  searchColumns.value.forEach((c) => {
    const key = c.dataIndex as string
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

  // overwriteParams 优先级比 apiParams 高
  return props.api.getList({ ...rest, ...overwriteParams })
    .then((res) => {
      tableData.value = res.data
      pagination.value.total = res?.pagination?.total
    })
    .catch((e) => {
      message.error('Failed to fetch data')
    })
    .finally(() => {
      tableLoading.value = false
    })
}, 200, { leading: false, trailing: true })

// apiParams 改变时，同步到 route query，并重新请求数据
watch(apiParams, async (newVal, oldVal) => {
  // apiParams 是个 Object，可能存在 Object 指针发生变化，实际内部属性没有变化的情况
  // 如果内部属性没有变化，则不触发请求
  if (isEqual(newVal, oldVal)) {
    return
  }
  if (!props.disableRouterQuery) {
    console.log('apiParams changed', newVal, oldVal)
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

function onTableChange(p: TablePaginationConfig, filters: Record<string, FilterValue>, sorter: SorterResult | SorterResult<any>[]) {
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
    console.log('onTableChange', p.current, p.pageSize)
  }
}

/**
 * 删改查相关 Emits
 */
function onReadBtnClick(record: any) {
  emit('read', record)
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
</script>

<template>
  <div>
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
          <Button @click="resetSearchForm">
            {{ $gettext('Reset') }}
          </Button>
          <slot
            name="searchFormAction"
            :form-data="formData"
          />
        </Flex>
      </template>
    </StdSearch>
    <Table
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
            v-if="!isTrash"
            size="small"
            type="link"
            @click="onReadBtnClick(record)"
          >
            {{ $gettext('View') }}
          </Button>
          <Button
            v-if="!disableEdit && !isTrash"
            size="small"
            type="link"
            @click="onEditBtnClick(record)"
          >
            {{ $gettext('Edit') }}
          </Button>
          <Popconfirm
            v-if="!disableDelete && !isTrash"
            :title="$gettext('Are you sure want to delete?')"
            @confirm="onDeleteBtnClick(record)"
          >
            <Button
              size="small"
              type="link"
              danger
            >
              {{ $gettext('Delete') }}
            </Button>
          </Popconfirm>
          <Popconfirm
            v-if="!disableTrash && isTrash"
            :title="$gettext('Are you sure want to restore?')"
            @confirm="onRestoreBtnClick(record)"
          >
            <Button
              size="small"
              type="link"
            >
              {{ $gettext('Restore') }}
            </Button>
          </Popconfirm>
          <Popconfirm
            v-if="!disableDelete && isTrash"
            :title="$gettext('Are you sure want to delete permanently?')"
            @confirm="onDeletePermanentlyBtnClick(record)"
          >
            <Button
              size="small"
              type="link"
              danger
            >
              {{ $gettext('Delete Permanently') }}
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

<style scoped lang="less"></style>
