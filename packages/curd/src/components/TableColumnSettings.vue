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

  if (savedColumnKeys && savedColumnKeys.length > 0) {
    // 使用保存的配置：基于保存的key数组重新排序和筛选
    const columnsMap = new Map(props.columns.map(col => [getColumnKey(col), col]))
    const orderedColumns: StdTableColumn[] = []
    // 按保存的顺序添加列
    savedColumnKeys.forEach((col) => {
      const column = columnsMap.get(col.key)
      if (column && !isSystemColumn(column)) {
        column.hiddenInTable = col.hiddenInTable
        orderedColumns.push(column)
      }
    })

    localColumns.value = orderedColumns
    tempColumns.value = cloneDeep(orderedColumns)
  }
  else {
    // 首次使用，使用默认配置（过滤掉系统列）
    const defaultColumns = props.columns.filter(column => !isSystemColumn(column))
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
      column.hiddenInTable = value
    })
  },
})

function onCheckAllChange() {
  // 由于使用了 computed 的 setter，这里不需要额外逻辑
}

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
  tempColumns.value = cloneDeep(defaultColumns)
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
      type="text"
      size="small"
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
              @change="onCheckAllChange"
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
</style>
