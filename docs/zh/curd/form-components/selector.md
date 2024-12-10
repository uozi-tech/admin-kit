# 选择器

```ts
type SelectorConfig = {
  tableProps?: TableProps
  rowKey?: string
  displayKey?: string // 选择后渲染的数据字段名称
  selectionType?: 'radio' | 'checkbox'
  api: any // 获取列表数据的api
  columns: StdTableColumn[]
  tips?: string
  disabled?: boolean
  hideInputContainer?: boolean
  modalWidth?: number | string
} & PlaceholderT
```
