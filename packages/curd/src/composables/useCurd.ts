import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'
import { i18n } from '../i18n'
import { StdCurdProps } from '../types'

export default function useCurd(props: StdCurdProps, lang: string) {
  const mode = ref('add')
  const formData = ref({})
  const formVisible = ref(false)
  const data = ref([])
  const tableLoading = ref(false)
  const modalLoading = ref(false)

  const pagination = reactive<any>({
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
    ...props.pagination,
  })

  async function getList(params?: Record<string, any>) {
    tableLoading.value = true
    return props.api
      .getList({ page: pagination.current, pageSize: pagination?.pageSize ?? 10, ...params })
      .then((res: any) => {
        data.value = res.data
        const { total } = res.pagination
        pagination.total = total
      })
      .catch(() => {})
      .finally(() => {
        tableLoading.value = false
      })
  }

  function handleRead(row: Record<string, any>) {
    formVisible.value = true
    mode.value = 'read'
    formData.value = cloneDeep(row)
  }

  function handleAdd() {
    formVisible.value = true
    mode.value = 'add'
    formData.value = {}
  }

  function handleEdit(row: Record<string, any>) {
    formVisible.value = true
    mode.value = 'edit'
    formData.value = cloneDeep(row)
  }

  function handleSave() {
    modalLoading.value = true
    const operation = mode.value === 'add' ? 'create' : 'update'

    props.api[operation](formData.value)
      .then(() => {
        getList()
        formVisible.value = false
      })
      .finally(() => (modalLoading.value = false))
  }

  return {
    tableLoading,
    modalLoading,
    mode,
    data,
    formData,
    formVisible,
    pagination,
    getList,
    handleRead,
    handleAdd,
    handleEdit,
    handleSave,
  }
}
