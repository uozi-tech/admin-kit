# StdTable

## Props

- `columns`: 列配置数组，定义表格的列。
- `api`: API 对象，包含获取数据的方法。
- `tableProps`: 表格属性配置。
- `disableEdit`: 是否禁用编辑功能。
- `disableDelete`: 是否禁用删除功能。
- `disableSearch`: 是否禁用搜索功能。
- `disableTrash`: 是否禁用回收站功能。
- `rowSelectionType`: 行选择类型，可选值为 checkbox 或 radio。
- `isTrash`: 是否显示回收站数据。
- `refreshConfig`: 用于触发 table 数据刷新。示例：`{ timestamp: 时间戳, reset: true }`
- `onlyQuery`: 只读模式，隐藏`编辑`和`删除`功能。

### Types Definition

```ts
interface StdTableProps extends Pick<
  StdCurdProps,
  'tableProps' |
  'columns' |
  'api' |
  'disableEdit' |
  'disableSearch' |
  'disableDelete' |
  'customParams' |
  'listApiParams' |
  'disableRouterQuery' |
  'tableProps' |
  'rowSelectionType' |
  'disableTrash'
> {
  refreshConfig?: {
    // 刷新时间戳
    timestamp: number
    // 是否重置查询参数
    reset?: boolean
  }
  onlyQuery?: boolean
  isTrash?: boolean
}
```

## Slots

- `beforeActions`: 行操作前插槽。
- `afterActions`: 行操作后插槽。

## Events

- `read`: 查看详情事件。
- `edit`: 编辑事件。
- `delete`: 删除事件。
- `restore`: 恢复事件。
- `deletePermanently`: 彻底删除事件。
