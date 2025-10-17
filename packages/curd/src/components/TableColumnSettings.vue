<script setup lang="ts">
import type { StdTableColumn } from '../types'
import { HolderOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { Button, Checkbox, Dropdown } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import Sortable from 'sortablejs'
import { computed, h, nextTick, onMounted, ref, watch } from 'vue'
import { useLocale } from '../composables'
import { getColumnKey, getRealContent } from '../utils'

const props = defineProps<{
  columns: StdTableColumn[]
  tableId: string
}>()

const emit = defineEmits<{
  change: [columns: StdTableColumn[]]
}>()

const { t } = useLocale()

const visible = ref(false)
const sortableContainer = ref<HTMLElement>()
const localColumns = ref<StdTableColumn[]>([])
// 临时配置（用于在确认前预览）
const tempColumns = ref<StdTableColumn[]>([])

// 获取存储键 - 基于页面路径，确保配置持久化（去除查询参数）
const storageKey = computed(() => {
  const urlWithoutQuery = window.location.href.split('?')[0]
  return `table-column-config-${urlWithoutQuery.replace(/\//g, '-')}`
})

// 初始化列配置
function initializeColumns() {
  const savedColumnKeys = getSavedConfig()
  const availableColumns = props.columns.filter(column => !isSystemColumn(column))

  if (savedColumnKeys && savedColumnKeys.length > 0) {
    // 使用保存的配置：基于保存的key数组重新排序和筛选
    const columnsMap = new Map(availableColumns.map(col => [getColumnKey(col), col]))

    // 创建已保存列的顺序和可见性映射
    const savedOrderMap = new Map<string, number>()
    const savedVisibilityMap = new Map<string, boolean>()
    savedColumnKeys.forEach((col, index) => {
      savedOrderMap.set(col.key, index)
      savedVisibilityMap.set(col.key, col.hiddenInTable)
    })

    // 追踪已处理的保存列索引
    const processedSavedIndices = new Set<number>()
    const orderedColumns: StdTableColumn[] = []

    // 遍历原始列顺序，保持新列在原始位置
    availableColumns.forEach((column) => {
      const key = getColumnKey(column)
      const savedIndex = savedOrderMap.get(key as string)

      if (savedIndex !== undefined) {
        // 这是一个已保存的列
        // 检查是否已经被处理过（可能在之前的循环中被插入了）
        if (processedSavedIndices.has(savedIndex)) {
          return // 跳过已处理的列
        }

        // 先插入所有应该在它之前但还未处理的已保存列
        for (let i = 0; i < savedIndex; i++) {
          if (!processedSavedIndices.has(i)) {
            const savedKey = savedColumnKeys[i].key
            const savedColumn = columnsMap.get(savedKey)
            if (savedColumn) {
              savedColumn.hiddenInTable = savedColumnKeys[i].hiddenInTable
              orderedColumns.push(savedColumn)
              processedSavedIndices.add(i)
            }
          }
        }

        // 插入当前列
        column.hiddenInTable = savedVisibilityMap.get(key as string) ?? false
        orderedColumns.push(column)
        processedSavedIndices.add(savedIndex)
      }
      else {
        // 这是一个新列，按原始顺序直接插入
        column.hiddenInTable = false
        orderedColumns.push(column)
      }
    })

    localColumns.value = orderedColumns
    tempColumns.value = cloneDeep(orderedColumns)
  }
  else {
    // 首次使用，使用默认配置（所有非系统列默认显示）
    const defaultColumns = availableColumns.map((column) => {
      const col = cloneDeep(column)
      col.hiddenInTable = false
      return col
    })
    localColumns.value = defaultColumns
    tempColumns.value = cloneDeep(defaultColumns)
  }
}

// 判断是否为系统列（如操作列、拖拽列等）
function isSystemColumn(column: StdTableColumn): boolean {
  const dataIndex = column.dataIndex
  return dataIndex === 'actions' || dataIndex === 'drag' || column.key === 'actions'
}

// 获取保存的配置 - 现在返回字符串数组
function getSavedConfig(): { key: string, hiddenInTable: boolean }[] | null {
  try {
    const saved = localStorage.getItem(storageKey.value)
    return saved ? JSON.parse(saved) : null
  }
  catch {
    return null
  }
}

// 保存配置 - 现在只保存显示列的key数组
function saveConfig() {
  const visibleColumnKeys = (localColumns.value as any[])
    .map(column => ({
      key: getColumnKey(column) as string,
      hiddenInTable: column.hiddenInTable,
    }))

  localStorage.setItem(storageKey.value, JSON.stringify(visibleColumnKeys))
}

// 生成最终的列配置
function generateFinalColumns(): StdTableColumn[] {
  const visibleColumns = (localColumns.value as any[]).filter(column => !column.hiddenInTable)

  // 添加系统列
  const systemColumns = props.columns.filter(column => isSystemColumn(column))

  return [...visibleColumns, ...systemColumns]
}

// 确认应用设置
function applySettings() {
  localColumns.value = cloneDeep(tempColumns.value)
  saveConfig()
  emit('change', generateFinalColumns())
  visible.value = false
}

// 取消设置
function cancelSettings() {
  tempColumns.value = cloneDeep(localColumns.value)
  visible.value = false
}

// 全选/取消全选
const checkAll = computed({
  get: (): boolean => (tempColumns.value as any[]).every(column => !column.hiddenInTable),
  set: (value: boolean): void => {
    (tempColumns.value as any[]).forEach((column) => {
      column.hiddenInTable = !value // 修复：全选时应该显示所有列（hiddenInTable为false）
    })
  },
})

// 半选状态
const indeterminate = computed(() => {
  const visibleCount = (tempColumns.value as any[]).filter(column => !column.hiddenInTable).length
  return visibleCount > 0 && visibleCount < tempColumns.value.length
})

let sortableInstance: Sortable | null = null

// 重置列配置
function resetColumns() {
  const defaultColumns = props.columns
    .filter(column => !isSystemColumn(column))
    .map((column) => {
      // 重置时所有列都默认显示
      const col = cloneDeep(column)
      col.hiddenInTable = false
      return col
    })
  tempColumns.value = defaultColumns
}

function getPopupContainer(triggerNode?: Element) {
  return triggerNode?.parentNode as HTMLElement || document.body
}

// 初始化拖拽排序
function initSortable() {
  if (sortableContainer.value && !sortableInstance) {
    sortableInstance = Sortable.create(sortableContainer.value, {
      animation: 150,
      handle: '.column-drag-handle',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt
        if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
          // 更新临时列顺序
          const movedColumn = tempColumns.value.splice(oldIndex, 1)[0]
          tempColumns.value.splice(newIndex, 0, movedColumn)
        }
      },
    })
  }
}

// 组件挂载时初始化
onMounted(() => {
  initializeColumns()
  emit('change', generateFinalColumns())
})

// 监听 columns 变化
watch(() => props.columns, () => {
  initializeColumns()
  emit('change', generateFinalColumns())
}, { deep: true })

// 监听弹窗显示状态，初始化拖拽和重置临时配置
watch(visible, async (newVisible) => {
  if (newVisible) {
    // 重置临时配置为当前配置
    tempColumns.value = cloneDeep(localColumns.value)
    await nextTick()
    initSortable()
  }
})
</script>

<template>
  <Dropdown
    v-model:open="visible"
    trigger="click"
    placement="bottomRight"
    :get-popup-container="getPopupContainer"
  >
    <Button
      :icon="h(SettingOutlined)"
      @click.stop="visible = !visible"
    />
    <template #overlay>
      <div class="table-column-settings">
        <div class="settings-header">
          <span class="settings-title">{{ t('Column Settings') }}</span>
          <Button
            type="link"
            size="small"
            @click="resetColumns"
          >
            {{ t('reset') }}
          </Button>
        </div>
        <div class="settings-content">
          <div
            ref="sortableContainer"
            class="column-list"
          >
            <div
              v-for="column in tempColumns"
              :key="String(column.key || column.dataIndex)"
              class="column-item"
              :data-key="String(column.key || column.dataIndex)"
            >
              <div class="column-drag-handle">
                <HolderOutlined />
              </div>
              <Checkbox
                :checked="!column.hiddenInTable"
                @change="(e) => column.hiddenInTable = !e.target.checked"
              >
                <span class="column-title">{{ getRealContent(column.title) }}</span>
              </Checkbox>
            </div>
          </div>
        </div>
        <div class="settings-footer">
          <div class="footer-checkbox">
            <Checkbox
              v-model:checked="checkAll"
              :indeterminate="indeterminate"
            >
              {{ t('selectAll') }}
            </Checkbox>
          </div>
          <div class="footer-actions">
            <Button
              size="small"
              @click="cancelSettings"
            >
              {{ t('cancel') }}
            </Button>
            <Button
              type="primary"
              size="small"
              @click="applySettings"
            >
              {{ t('Apply') }}
            </Button>
          </div>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<style scoped lang="less">
.table-column-settings {
  width: 280px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;

    .settings-title {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.88);
    }
  }

  .settings-content {
    max-height: 300px;
    overflow-y: auto;

    .column-list {
      padding: 8px 0;

      .column-item {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        cursor: move;
        transition: background-color 0.2s;

        &:hover {
          background-color: #f5f5f5;
        }

        .column-drag-handle {
          margin-right: 8px;
          color: #bfbfbf;
          cursor: grab;

          &:active {
            cursor: grabbing;
          }
        }

        .column-title {
          user-select: none;
        }
      }
    }
  }

  .settings-footer {
    padding: 12px 16px;
    border-top: 1px solid #f0f0f0;

    .footer-checkbox {
      margin-bottom: 12px;
    }

    .footer-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  }
}

.dark {
  .table-column-settings {
    background: #141414;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.2);

    .settings-header {
      border-bottom: 1px solid #424242;

      .settings-title {
        color: rgba(255, 255, 255, 0.85);
      }
    }

    .settings-content {
      .column-list {
        .column-item {
          &:hover {
            background-color: #1f1f1f;
          }

          .column-drag-handle {
            color: #595959;
          }
        }
      }
    }

    .settings-footer {
      border-top: 1px solid #424242;
    }
  }
}
</style>
