import type { StdTableProps } from 'src/types'
import Sortable from 'sortablejs'
import { ref, type Ref, toRaw } from 'vue'

function getRowKey(item: any) {
  return item.dataset.rowKey
}

function getTargetData(data: any, indexList: number[]): any {
  let target: any = { children: data }
  indexList.forEach((index: number) => {
    console.log(target)
    target.children[index].parent = target
    target = target.children[index]
  })

  return target
}

function useDraggableTable(options?: StdTableProps['rowDraggableOptions']) {
  const randomId = ref(Math.random().toString(36).substring(2, 8))
  const rowsKeyIndexMap = ref<Record<number, number[]>>({})

  const buildIndexMap = (data: any, level: number = 0, index: number = 0, total: number[] = []) => {
    if (data && data.length > 0) {
      data.forEach((v: any) => {
        v.level = level

        const currentIndexes = [...total, index++]

        rowsKeyIndexMap.value[v.id] = currentIndexes
        if (v.children)
          buildIndexMap(v.children, level + 1, 0, currentIndexes)
      })
    }
  }

  const resetIndexMap = () => {
    rowsKeyIndexMap.value = {}
  }

  const initSortable = (dataSource: Ref<any[]>) => {
    const table: any = document.querySelector(`#std-table-${randomId.value} tbody`)

    new Sortable(table, {
      handle: '.ant-table-drag-icon',
      animation: 150,
      sort: true,
      forceFallback: true,

      setData(dataTransfer) {
        dataTransfer.setData('Text', '')
      },

      // onStart({ item }) {
      //   const targetRowKey = Number(getRowKey(item))
      //   if (targetRowKey)
      //     expandKeysList.value = expandKeysList.value.filter((_item: Key) => _item !== targetRowKey)
      // },

      onMove({
        dragged,
        related,
      }) {
        const oldRow: number[] = rowsKeyIndexMap.value?.[Number(getRowKey(dragged))]
        const newRow: number[] = rowsKeyIndexMap.value?.[Number(getRowKey(related))]

        if (oldRow.length !== newRow.length || oldRow[oldRow.length - 2] !== newRow[newRow.length - 2])
          return false

        return options?.onMove?.(oldRow, newRow)
      },

      async onEnd({
        item,
        newIndex,
        oldIndex,
      }) {
        if (newIndex === oldIndex)
          return

        const indexDelta: number = Number(oldIndex) - Number(newIndex)
        const direction: number = indexDelta > 0 ? +1 : -1

        const rowIndex: number[] = rowsKeyIndexMap.value?.[Number(getRowKey(item))]
        const newRow = getTargetData(dataSource.value, rowIndex)
        const newRowParent = newRow.parent
        const level: number = newRow.level

        const currentRowIndex: number[] = [...rowsKeyIndexMap.value![Number(getRowKey(table?.children?.[Number(newIndex) + direction]))]]

        const currentRow: any = getTargetData(dataSource.value, currentRowIndex)

        // Reset parent
        currentRow.parent = newRow.parent = null
        newRowParent.children.splice(rowIndex[level], 1)
        newRowParent.children.splice(currentRowIndex[level], 0, toRaw(newRow))

        const changeIds: number[] = []

        function processChanges(row: any, children = false, _newIndex: number | undefined = undefined) {
        // Build changes ID list expect new row
          if (children || _newIndex === undefined)
            changeIds.push(row.id)

          if (_newIndex !== undefined)
            rowsKeyIndexMap.value[row.id][level] = _newIndex
          else if (children)
            rowsKeyIndexMap.value[row.id][level] += direction

          row.parent = null
          if (row.children)
            row.children.forEach((v: any) => processChanges(v, true, _newIndex))
        }

        // Replace row index for new row
        processChanges(newRow, false, currentRowIndex[level])

        // Rebuild row index maps for changes row
        for (let i = Number(oldIndex); i !== newIndex; i -= direction) {
          const _rowIndex: number[] = rowsKeyIndexMap.value?.[getRowKey(table.children[i])]

          _rowIndex[level] += direction
          processChanges(getTargetData(dataSource.value, _rowIndex))
        }

        // console.log('Change row id', newRow.id, 'order', newRow.id, '=>', currentRow.id, ', direction: ', direction,
        //   ', changes IDs:', changeIds

        options?.onEnd?.({
          target_id: newRow.id,
          direction,
          affected_ids: changeIds,
        })

      //   props.api.update_order({
      //     target_id: newRow.id,
      //     direction,
      //     affected_ids: changeIds,
      //   }).then(() => {
        //     message.success($gettext('Updated successfully'))
        //   })
      },
    })
  }

  return {
    initSortable,
    buildIndexMap,
    resetIndexMap,
    randomId,
    rowsKeyIndexMap,
  }
}

export default useDraggableTable
