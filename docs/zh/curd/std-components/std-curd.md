# StdCurd

## Props

- `columns`: 列配置数组，定义表格的列。
- `api`: API 对象，包含增删改查的方法。
- `title`: 表格标题。
- `rowKey`: 行唯一标识。
- `rowSelectionType`: 行选择类型，可选值为 checkbox 或 radio。
- `customParams`: 自定义查询参数，请求列表接口时会携带，会同步到 route query 上。
- `listApiParams`: 列表查询Api参数，直接传入，优先级最高, 不会同步到 route query 上。
- `modalWidth`: 弹窗宽度。
- `scrollX`: 表格水平滚动宽度。
- `scrollY`: 表格垂直滚动高度。
- `tableProps`: Ant Design Vue 表格属性。
- `disableRouterQuery`: 是否禁用路由查询参数同步。
- `disableSearch`: 是否禁用搜索功能。
- `disableAdd`: 是否禁用添加功能。
- `disableEdit`: 是否禁用编辑功能。
- `disableDelete`: 是否禁用删除功能。
- `disableExport`: 是否禁用导出功能。
- `disableTrash`: 是否禁用回收站功能。

## Slots

- `titleRight`: 表格标题右侧插槽。
- `beforeListActions`: 列表右上方操作前插槽。
- `afterListActions`: 列表右上方操作后插槽。

## Events

- `add`: 新增事件。
- `read`: 查看详情事件。
- `edit`: 编辑事件。
- `delete`: 删除事件。
- `restore`: 恢复事件。
- `deletePermanently`: 彻底删除事件
