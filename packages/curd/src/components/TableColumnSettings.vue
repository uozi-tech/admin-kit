<script setup lang="ts">
import type { StdTableColumn } from '../types'
import type { ManagedTableColumn, StoredColumnSetting } from '../utils'
import { HolderOutlined, SettingOutlined } from '@antdv-next/icons'
import { Button, Checkbox, Dropdown } from 'antdv-next'
import { cloneDeep } from 'lodash-es'
import Sortable from 'sortablejs'
import { computed, h, nextTick, onMounted, ref, shallowRef, toRaw, watch } from 'vue'
import { useLocale } from '../composables'
import {
  createManagedColumns,
  getRealContent,
  normalizeTableColumnKeys,
  parseColumnSettings,
  restoreColumnSettings,
  serializeColumnSettings,
} from '../utils'

const props = defineProps<{
  columns: StdTableColumn[]
}>()

const emit = defineEmits<{
  change: [columns: StdTableColumn[]]
}>()

const { t } = useLocale()

const visible = ref(false)
const sortableContainer = ref<HTMLElement>()
const localColumns = shallowRef<ManagedTableColumn[]>([])
const slashRegex = /\//g
// 临时配置（用于在确认前预览）
const tempColumns = shallowRef<ManagedTableColumn[]>([])
const orphanedSettings = shallowRef<StoredColumnSetting[]>([])

// 获取存储键 - 基于页面路径，确保配置持久化（去除查询参数）
const storageKey = computed(() => {
  const urlWithoutQuery = window.location.href.split('?')[0]
  return `table-column-config-${urlWithoutQuery.replace(slashRegex, '-')}`
})

// 初始化列配置
function initializeColumns() {
  const availableColumns = createManagedColumns(
    props.columns.filter(column => !isSystemColumn(column)),
  )
  const savedConfig = getSavedConfig()

  if (!savedConfig) {
    localColumns.value = availableColumns
    tempColumns.value = cloneDeep(availableColumns)
    orphanedSettings.value = []
    return
  }

  const restored = restoreColumnSettings(availableColumns, savedConfig.columns)
  localColumns.value = restored.columns
  tempColumns.value = cloneDeep(restored.columns)
  orphanedSettings.value = restored.orphaned

  if (savedConfig.needsMigration)
    saveConfig()
}

// 判断是否为系统列（如操作列、拖拽列等）
function isSystemColumn(column: StdTableColumn): boolean {
  const dataIndex = column.dataIndex
  return dataIndex === 'actions' || dataIndex === 'drag' || column.key === 'actions'
}

// 同时读取旧数组格式与当前版本配置
function getSavedConfig() {
  return parseColumnSettings(localStorage.getItem(storageKey.value))
}

// 原位置升级配置，保留未出现在当前列定义中的历史设置
function saveConfig() {
  const columns = toRaw(localColumns.value) as ManagedTableColumn[]
  const orphaned = toRaw(orphanedSettings.value) as StoredColumnSetting[]
  const config = serializeColumnSettings(columns, orphaned)
  localStorage.setItem(storageKey.value, JSON.stringify(config))
}

// 生成最终的列配置
function generateFinalColumns(): StdTableColumn[] {
  const visibleColumns = localColumns.value
    .filter(column => !column.column.hiddenInTable)
    .map(column => column.column)

  // 添加系统列
  const systemColumns = props.columns.filter(column => isSystemColumn(column))

  return normalizeTableColumnKeys([...visibleColumns, ...systemColumns])
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
  get: (): boolean => tempColumns.value.every(column => !column.column.hiddenInTable),
  set: (value: boolean): void => {
    tempColumns.value = tempColumns.value.map(column => ({
      ...column,
      column: {
        ...column.column,
        hiddenInTable: !value,
      },
    }))
  },
})

// 半选状态
const indeterminate = computed(() => {
  const visibleCount = tempColumns.value.filter(column => !column.column.hiddenInTable).length
  return visibleCount > 0 && visibleCount < tempColumns.value.length
})

function updateColumnVisibility(id: string, checked: boolean) {
  tempColumns.value = tempColumns.value.map(column => column.id === id
    ? {
        ...column,
        column: {
          ...column.column,
          hiddenInTable: !checked,
        },
      }
    : column)
}

let sortableInstance: Sortable | null = null

// 重置列配置
function resetColumns() {
  const defaultColumns = createManagedColumns(
    props.columns.filter(column => !isSystemColumn(column)),
  )
  defaultColumns.forEach((column) => {
    column.column.hiddenInTable = false
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
          const reorderedColumns = [...tempColumns.value]
          const movedColumn = reorderedColumns.splice(oldIndex, 1)[0]
          reorderedColumns.splice(newIndex, 0, movedColumn)
          tempColumns.value = reorderedColumns
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
    :trigger="['click']"
    placement="bottomRight"
    :get-popup-container="getPopupContainer"
  >
    <Button
      :icon="h(SettingOutlined)"
      @click.stop="visible = !visible"
    />
    <template #popupRender>
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
              v-for="managedColumn in tempColumns"
              :key="managedColumn.id"
              class="column-item"
              :data-key="managedColumn.id"
            >
              <div class="column-drag-handle">
                <HolderOutlined />
              </div>
              <Checkbox
                :checked="!managedColumn.column.hiddenInTable"
                @change="(e) => updateColumnVisibility(managedColumn.id, e.target.checked)"
              >
                <span class="column-title">{{ getRealContent(managedColumn.column.title) }}</span>
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
