import { utils, writeFile } from 'xlsx'
import { StdTableColumn } from '../types'
import { get, set } from 'lodash-es'

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

  return {
    exportExcel,
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
