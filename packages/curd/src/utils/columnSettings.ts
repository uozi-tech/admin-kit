import type { StdTableColumn } from '../types'
import { cloneDeep } from 'lodash-es'
import { getColumnKey } from './util'

export const COLUMN_SETTINGS_VERSION = 2

export interface ManagedTableColumn {
  id: string
  legacyKey: string
  column: StdTableColumn
}

export interface StoredColumnSetting {
  id: string
  key: string
  hiddenInTable: boolean
}

export interface StoredColumnSettings {
  version: typeof COLUMN_SETTINGS_VERSION
  columns: StoredColumnSetting[]
}

interface LegacyColumnSetting {
  key: string | number
  hiddenInTable?: boolean
}

export interface ParsedColumnSettings {
  columns: StoredColumnSetting[]
  needsMigration: boolean
}

export interface RestoredColumnSettings {
  columns: ManagedTableColumn[]
  orphaned: StoredColumnSetting[]
}

function createColumnId(key: string, occurrence: number): string {
  return `${key.length}:${key}:${occurrence}`
}

function getLegacyKey(column: StdTableColumn, index: number): string {
  const key = String(getColumnKey(column))
  return key || `column-${index}`
}

function isLegacyColumnSetting(value: unknown): value is LegacyColumnSetting {
  if (!value || typeof value !== 'object')
    return false

  const setting = value as Partial<LegacyColumnSetting>
  return (typeof setting.key === 'string' || typeof setting.key === 'number')
    && (setting.hiddenInTable === undefined || typeof setting.hiddenInTable === 'boolean')
}

function isStoredColumnSetting(value: unknown): value is StoredColumnSetting {
  if (!value || typeof value !== 'object')
    return false

  const setting = value as Partial<StoredColumnSetting>
  return typeof setting.id === 'string'
    && typeof setting.key === 'string'
    && typeof setting.hiddenInTable === 'boolean'
}

export function createManagedColumns(columns: StdTableColumn[]): ManagedTableColumn[] {
  const occurrenceMap = new Map<string, number>()

  return columns.map((column, index) => {
    const legacyKey = getLegacyKey(column, index)
    const occurrence = occurrenceMap.get(legacyKey) ?? 0
    occurrenceMap.set(legacyKey, occurrence + 1)

    return {
      id: createColumnId(legacyKey, occurrence),
      legacyKey,
      column: cloneDeep(column),
    }
  })
}

export function parseColumnSettings(value: string | null): ParsedColumnSettings | null {
  if (!value)
    return null

  try {
    const parsed = JSON.parse(value) as unknown

    if (Array.isArray(parsed) && parsed.every(isLegacyColumnSetting)) {
      const occurrenceMap = new Map<string, number>()
      return {
        needsMigration: true,
        columns: parsed.map((setting) => {
          const key = String(setting.key)
          const occurrence = occurrenceMap.get(key) ?? 0
          occurrenceMap.set(key, occurrence + 1)
          return {
            id: createColumnId(key, occurrence),
            key,
            hiddenInTable: Boolean(setting.hiddenInTable),
          }
        }),
      }
    }

    if (parsed && typeof parsed === 'object') {
      const config = parsed as Partial<StoredColumnSettings>
      if (config.version === COLUMN_SETTINGS_VERSION
        && Array.isArray(config.columns)
        && config.columns.every(isStoredColumnSetting)) {
        return {
          needsMigration: false,
          columns: config.columns,
        }
      }
    }
  }
  catch {
    return null
  }

  return null
}

export function restoreColumnSettings(
  availableColumns: ManagedTableColumn[],
  savedColumns: StoredColumnSetting[],
): RestoredColumnSettings {
  const availableMap = new Map(availableColumns.map(column => [column.id, column]))
  const restored: ManagedTableColumn[] = []
  const restoredIds = new Set<string>()
  const orphaned: StoredColumnSetting[] = []

  savedColumns.forEach((setting) => {
    const managedColumn = availableMap.get(setting.id)
    if (!managedColumn || restoredIds.has(setting.id)) {
      orphaned.push(setting)
      return
    }

    managedColumn.column.hiddenInTable = setting.hiddenInTable
    restored.push(managedColumn)
    restoredIds.add(setting.id)
  })

  availableColumns.forEach((managedColumn, originalIndex) => {
    if (restoredIds.has(managedColumn.id))
      return

    const nextManagedColumn = availableColumns
      .slice(originalIndex + 1)
      .find(column => restoredIds.has(column.id))

    if (nextManagedColumn) {
      const insertIndex = restored.findIndex(column => column.id === nextManagedColumn.id)
      restored.splice(insertIndex, 0, managedColumn)
    }
    else {
      restored.push(managedColumn)
    }

    restoredIds.add(managedColumn.id)
  })

  return { columns: restored, orphaned }
}

export function serializeColumnSettings(
  columns: ManagedTableColumn[],
  orphaned: StoredColumnSetting[] = [],
): StoredColumnSettings {
  const activeIds = new Set(columns.map(column => column.id))
  return {
    version: COLUMN_SETTINGS_VERSION,
    columns: [
      ...columns.map(column => ({
        id: column.id,
        key: column.legacyKey,
        hiddenInTable: Boolean(column.column.hiddenInTable),
      })),
      ...orphaned.filter(setting => !activeIds.has(setting.id)),
    ],
  }
}

export function normalizeTableColumnKeys(columns: StdTableColumn[]): StdTableColumn[] {
  const managedColumns = createManagedColumns(columns)
  const keyCounts = new Map<string, number>()
  managedColumns.forEach((column) => {
    keyCounts.set(column.legacyKey, (keyCounts.get(column.legacyKey) ?? 0) + 1)
  })

  return managedColumns.map((managedColumn) => {
    const key = keyCounts.get(managedColumn.legacyKey) === 1
      ? managedColumn.legacyKey
      : managedColumn.id

    return {
      ...managedColumn.column,
      key,
    }
  })
}
