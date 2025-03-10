import type { StdTableProps } from 'src/types'
import type { Ref } from 'vue'
import Sortable from 'sortablejs'
import { ref, toRaw } from 'vue'

// 类型定义
interface RowData {
  id: number
  level?: number
  children?: RowData[]
  parent?: any
  [key: string]: any
}

interface DragEndPayload {
  target_id: number
  direction: number
  affected_ids: number[]
}

// 从DOM元素获取行键
function getRowKey(element: HTMLElement) {
  return element.dataset.rowKey ?? ''
}

// 根据索引路径获取目标数据
function getTargetData(data: RowData[], indexPath: number[]): RowData {
  let target: any = { children: data }

  indexPath?.forEach((index: number) => {
    // 设置父引用以便后续操作
    target.children[index].parent = target
    target = target.children[index]
  })

  return target
}

function useDraggableTable(options?: StdTableProps['rowDraggableOptions']) {
  // 生成随机ID用于DOM选择器
  const tableId = ref(Math.random().toString(36).substring(2, 8))
  // 存储行键与索引路径的映射关系
  const rowKeyIndexMap = ref<Record<number, number[]>>({})

  // 构建行索引映射
  function buildIndexMap(data: RowData[] | any[], level: number = 0, index: number = 0, parentPath: number[] = []) {
    if (!data || data.length === 0)
      return

    data.forEach((row: RowData) => {
      // 设置行级别
      row.level = level
      // 当前行完整索引路径
      const currentPath = [...parentPath, index++]
      // 记录行ID到索引路径的映射
      rowKeyIndexMap.value[row.id] = currentPath

      // 递归处理子行
      if (row.children?.length) {
        buildIndexMap(row.children, level + 1, 0, currentPath)
      }
    })
  }

  // 重置索引映射表
  function resetIndexMap() {
    rowKeyIndexMap.value = {}
  }

  // 处理拖拽导致的行索引变更
  function processRowIndexChanges(row: RowData, isChild: boolean = false, newLevelIndex?: number, direction?: number) {
    const level = row.level || 0
    const rowId = row.id

    // 构建变更ID列表
    if (isChild || newLevelIndex === undefined) {
      return rowId
    }

    // 更新索引映射
    if (newLevelIndex !== undefined) {
      rowKeyIndexMap.value[rowId][level] = newLevelIndex
    }
    else if (isChild && direction !== undefined) {
      rowKeyIndexMap.value[rowId][level] += direction
    }

    // 清除临时父引用
    row.parent = null

    // 递归处理子行
    if (row.children?.length) {
      return [rowId, ...row.children.map(child => processRowIndexChanges(child, true, newLevelIndex, direction))]
    }

    return rowId
  }

  // 初始化拖拽功能
  function initSortable(dataSource: Ref<any[]>) {
    const tableElement: HTMLElement | null = document.querySelector(`#std-table-${tableId.value} tbody`)
    if (!tableElement)
      return

    new Sortable(tableElement, {
      handle: '.ant-table-drag-icon', // 拖拽把手
      animation: 150, // 动画持续时间
      sort: true, // 允许排序
      forceFallback: true, // 强制回退模式，解决某些浏览器兼容性问题

      // 设置拖拽数据
      setData(dataTransfer) {
        dataTransfer.setData('Text', '')
      },

      // 移动验证
      onMove({ dragged, related }) {
        const sourceRowPath = rowKeyIndexMap.value[getRowKey(dragged)]
        const targetRowPath = rowKeyIndexMap.value[getRowKey(related)]

        // 验证是否在同一层级
        if (sourceRowPath?.length !== targetRowPath?.length
          || sourceRowPath?.[sourceRowPath.length - 2] !== targetRowPath?.[targetRowPath.length - 2]) {
          return false
        }

        // 调用用户自定义验证
        return options?.onMove?.(sourceRowPath, targetRowPath)
      },

      // 拖拽完成处理
      async onEnd({ item, newIndex, oldIndex }) {
        if (newIndex === undefined || oldIndex === undefined || newIndex === oldIndex)
          return

        // 计算方向和索引差值
        const indexDelta = oldIndex - newIndex
        const direction = indexDelta > 0 ? 1 : -1

        // 获取被拖拽行的数据
        const draggedRowPath = rowKeyIndexMap.value[getRowKey(item)]
        const draggedRow = getTargetData(dataSource.value, draggedRowPath)
        const draggedRowParent = draggedRow.parent
        const level = draggedRow.level || 0

        // 获取目标位置行数据
        const targetRowPath = rowKeyIndexMap.value[getRowKey(tableElement?.children?.[newIndex + direction] as HTMLElement)] || []
        const targetRow = getTargetData(dataSource.value, targetRowPath)

        // 重置临时引用并更新数据源
        targetRow.parent = draggedRow.parent = null
        draggedRowParent?.children.splice(draggedRowPath[level], 1)
        draggedRowParent?.children.splice(targetRowPath[level], 0, toRaw(draggedRow))

        // 处理受影响的行
        const affectedIds: number[] = []

        // 更新被拖拽行的索引
        affectedIds.push(processRowIndexChanges(draggedRow, false, targetRowPath[level], direction))

        // 更新其他受影响行的索引
        for (let i = oldIndex; i !== newIndex; i -= direction) {
          const affectedRowPath = rowKeyIndexMap.value[getRowKey(tableElement.children[i] as HTMLElement)]
          if (!affectedRowPath)
            continue

          // 更新索引
          affectedRowPath[level] += direction
          const affectedRow = getTargetData(dataSource.value, affectedRowPath)
          affectedIds.push(processRowIndexChanges(affectedRow, false, undefined, direction))
        }

        // 扁平化并去重ID数组
        const flattenedIds = Array.from(new Set(affectedIds.flat()))

        // 调用完成回调
        options?.onEnd?.({
          target_id: draggedRow.id,
          direction,
          affected_ids: flattenedIds,
        })
      },
    })
  }

  return {
    initSortable,
    buildIndexMap,
    resetIndexMap,
    tableId,
    rowKeyIndexMap,
  }
}

export default useDraggableTable
