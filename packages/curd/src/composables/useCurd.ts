import { debounce } from 'lodash-es'
import { reactive, ref, computed, watch } from 'vue'
import { i18n } from '../i18n'
import { StdCurdProps } from '../types'
import { message } from 'ant-design-vue'
import { PaginationConfig } from 'ant-design-vue/es/pagination'

export default function useCurd(props: StdCurdProps, lang: string) {
  const router = useRouter()
  const route = useRoute()

  // 当前弹窗的模式
  const mode = ref<'add' | 'read' | 'edit'>('add')

  // 回收站标记
  const isTrash = ref(false)

  // 数据项详情
  const itemDetail = ref<Record<string, any>>({})

  // 新增/编辑弹窗可见标记
  const formVisible = ref(false)

  // 表格数据
  const tableData = ref<Record<string, any>[]>([])

  // 表格 loading 和 弹窗 loading
  const tableLoading = ref(false)
  const modalLoading = ref(false)

  const debouncedListApi = debounce(async () => {
    return props.api.getList(apiParams.value)
      .then((res: any) => {
        tableData.value = res.data
        pagination.total = res?.pagination?.total
      })
      .catch((err: any) => {
        message.error('Failed to fetch data')
      })
      .finally(() => {
        tableLoading.value = false
      })
  }, 200, { leading: false, trailing: true })

  const pagination = reactive<PaginationConfig>(initializePagination(props.pagination, getTableList, lang))

  const searchFormData = ref<Record<string, any>>({})
  const apiParams = computed(() => ({
    ...props.customParams,
    ...props.listQueryParams,
    ...searchFormData.value,
    trash: isTrash.value,
    page: pagination.current ?? 1,
    page_size: pagination?.pageSize ?? 10,
  }))

  function getTableList() {
    tableLoading.value = true
    debouncedListApi()
  }

  // 更新锁，用于防止同步 route query 到 api params 时死循环
  let isUpdatedFromApiParams = false

  // 更新路由 query，加入防抖是为了频繁触发时合并更新
  const debouncedUpdateRouteQuery = debounce(async (newQuery: Record<string, any>) => {
    isUpdatedFromApiParams = true
    await router.push({ query: newQuery })
    isUpdatedFromApiParams = false
  }, 200, { leading: false, trailing: true })

  // 搜索后重置分页页码
  watch(searchFormData, () => pagination.current = 1, { deep: true })

  // apiParams 改变时，同步到 route query，并重新请求数据
  watch(apiParams, async v => {
    await debouncedUpdateRouteQuery(v)
    getTableList()
  }, { deep: true, immediate: true })

  // route query 改变并且不是由 debouncedUpdateRouteQuery 触发的情况下，才同步到 apiParams
  watch(() => route.query, v => {
    if (isUpdatedFromApiParams) 
      return

    isTrash.value = JSON.parse(v.trash as string)
    pagination.current = Number(v.page) || 1
    pagination.pageSize = Number(v.page_size) || 20
    searchFormData.value = { ...v }
  }, { deep: true, immediate: true })

  // 重置搜索表单
  function resetSearchForm() {
    if (Object.keys(searchFormData.value).length === 0) 
      return
    
    searchFormData.value = {}
  }
  
  // 切换回收站和列表
  function switchTrashAndList() {
    if (tableLoading.value) 
      return
    
    isTrash.value = !isTrash.value
  }

  function getDataDetail(row: Record<string, any>) {
    modalLoading.value = true
    props.api.getDetail(row[props.rowKey ?? 'id']).then(res => {
      itemDetail.value = res
      modalLoading.value = false
    }).catch(() => {
      message.error('Failed to get item detail')
    })
  }

  // 查看详情
  function handleRead(row: Record<string, any>) {
    formVisible.value = true
    mode.value = 'read'
    getDataDetail(row)
  }

  // 打开添加弹窗
  function handleAdd() {
    formVisible.value = true
    mode.value = 'add'
    itemDetail.value = {}
  }

  // 打开编辑弹窗
  function handleEdit(row: Record<string, any>) {
    formVisible.value = true
    mode.value = 'edit'
    getDataDetail(row)
  }

  // 保存新增/编辑数据
  function handleSave(data: Record<string, any>) {
    modalLoading.value = true

    let promise: Promise<unknown>
    if (mode.value === 'add') 
      promise = props.api.create(data)
    else 
      promise = props.api.update(itemDetail[props.rowKey ?? 'id'], data)

    promise
      .then(() => {
        getTableList()
        formVisible.value = false
      })
      .catch((err: any) => {
        message.error('Failed to save data')
      })
      .finally(() => (modalLoading.value = false))
  }

  // 处理删除/恢复数据
  function handleDataById(action: string, record: Record<string, any>) {
    tableLoading.value = true
    props.api[action](record[props.rowKey ?? 'id'])
      .then(() => {
        getTableList()
      })
      .catch((err: any) => {
        message.error('Failed to execute the operation')
      })
  }

  return {
    tableLoading,
    modalLoading,
    isTrash,
    mode,
    searchFormData,
    tableData,
    itemDetail,
    formVisible,
    pagination,
    resetSearchForm,
    switchTrashAndList,
    handleRead,
    handleAdd,
    handleEdit,
    handleSave,
    handleDataById,
  }
}

function initializePagination(paginationProps: any, listApi: any, lang: string): PaginationConfig {
  return {
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: true,
    responsive: true,
    showTotal: (total: number) => `${i18n[lang].total}: ${total} ${i18n[lang].items}`,
    onChange: function (page: number, pageSize: number) {
      this.current = page
      this.pageSize = pageSize
      listApi({ page, pageSize })
    },
    ...paginationProps,
  }
}
