import { utils, writeFile } from 'xlsx'
import {ExportColumn, StdTableColumn} from '../types'
import { get, set } from 'lodash-es'
import {Ref} from "vue";

export function useExport(columns: StdTableColumn[], api?: (params: Record<string, any>) => Promise<any>) {
  const exportExcel = (selectedRowKey, selectedRows) => {
    if (api) {
      api({ id: selectedRowKey })?.then((res) => {
        excel(columns, res.data)
      })
    } else {
      excel(columns, selectedRows)
    }
  }

  const state = reactive({
    indeterminate: false,
    checkAll: true,
  })

  const exportColumns = ref(
    (columns as ExportColumn[])
      .filter((item) => !item.hiddenInExport)
      .map((item) => {
        if (typeof item.title === 'function') item.title = item.title()
        if (Array.isArray(item.dataIndex)) item.dataIndex = item.dataIndex.join('.')
        item.checked = true
        return item
      }),
  ) as Ref<ExportColumn[]>

  const onCheckAllChange = () => {
    state.indeterminate = false
    exportColumns.value = exportColumns.value.map((item) => {
      item.checked = state.checkAll
      return item
    })
  }
  watch(
    exportColumns,
    (val) => {
      const checkedCount = val.filter((item) => item.checked).length
      state.indeterminate = checkedCount > 0 && checkedCount < val.length
      state.checkAll = checkedCount === val.length
    },
    { deep: true },
  )

  return {
    exportExcel,
    exportColumns,
    state,
    onCheckAllChange
  }
}

function excel(columns: StdTableColumn[], data: Record<string, any>[]) {
  columns.forEach((column) => {
    data.forEach((item) => {
      if (column.customRender) {
        const text = get(item, column.dataIndex)
        set(item, column.dataIndex, column.customRender({ text, record: item, column, export: true }))
      }
    })
  })

  const worksheet = utils.json_to_sheet(data)
  const workbook = utils.book_new()

  utils.book_append_sheet(workbook, worksheet, 'Dates')
  writeFile(workbook, `test.xlsx`)
}
