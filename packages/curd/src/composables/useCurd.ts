import { cloneDeep, debounce } from 'lodash-es'
import { reactive, ref, computed, watch } from 'vue'
import { i18n } from '../i18n'
import { StdCurdProps } from '../types'
import { message } from 'ant-design-vue'

export default function useCurd(props: StdCurdProps, lang: string) {
  const mode = ref<'add' | 'read' | 'edit'>('add')
  const itemDetail = ref<Record<string, any>>({})
  const formVisible = ref(false)
  const tableData = ref<Record<string, any>[]>([])
  const tableLoading = ref(false)
  const modalLoading = ref(false)

  function initializePagination(paginationProps: any) {
    return {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      hideOnSinglePage: true,
      responsive: true,
      showTotal: (total: number) => `${i18n[lang].total}: ${total} ${i18n[lang].items}`,
      onChange: function (page: number, pageSize: number) {
        this.current = page
        this.pageSize = pageSize
        getList({ page, pageSize })
      },
      ...paginationProps,
    }
  }

  const pagination = reactive<any>(initializePagination(props.pagination))

  const router = useRouter()
  const route = useRoute()

  const searchFormData = ref<Record<string, any>>({})
  const apiParams = computed(() => ({
    ...props.customParams,
    ...props.listQueryParams,
    ...searchFormData.value,
  }))

  const getList = debounce((params?: Record<string, any>) => {
    tableLoading.value = true
    return props.api
        .getList({ page: pagination.current, pageSize: pagination?.pageSize ?? 10, ...apiParams.value, ...params })
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
  }, 100, { leading: false, trailing: true })

  const updateRouterQuery = debounce(() => router.push({ query: apiParams.value }), 200, { leading: false, trailing: true })

  watch(apiParams, async () => {
    await updateRouterQuery()
    getList()
  }, {
    deep: true,
    immediate: true
  })
  
  watch(() => route.query, getList, { deep: true, immediate: false })

  function resetSearchForm() {
    if (Object.keys(searchFormData.value).length === 0) {
      return
    }
    searchFormData.value = {}
  }

  function handleRead(row: Record<string, any>) {
    formVisible.value = true
    mode.value = 'read'
    itemDetail.value = cloneDeep(row)
  }

  function handleAdd() {
    formVisible.value = true
    mode.value = 'add'
    itemDetail.value = {}
  }

  function handleEdit(row: Record<string, any>) {
    formVisible.value = true
    mode.value = 'edit'
    itemDetail.value = cloneDeep(row)
  }

  function handleSave(data: Record<string, any>) {
    modalLoading.value = true
    const operation = mode.value === 'add' ? 'create' : 'update'

    props.api[operation](data)
        .then(() => {
          getList()
          formVisible.value = false
        })
        .catch((err: any) => {
          message.error('Failed to save data')
        })
        .finally(() => (modalLoading.value = false))
  }

  return {
    tableLoading,
    modalLoading,
    mode,
    searchFormData,
    tableData,
    itemDetail,
    formVisible,
    pagination,
    resetSearchForm,
    handleRead,
    handleAdd,
    handleEdit,
    handleSave,
  }
}
