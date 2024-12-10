# Std Column

Std Table Column 继承于 Ant Design Vue 的 Table Column，同时扩展了一些额外的字段。

## 基本定义

```tsx
import { CustomRenderArgs, StdTableColumn } from '@uozi-admin/curd'

const columns: StdTableColumn = [
  {
    title: '姓名', // 支持 string 和 返回 string 的函数
    dataIndex: 'name', // 与 Ant Design Vue 一致
    search: true, // 该列是否可搜索，搜索框类型为默认与 edit 类型一致，也支持自定义
    pure: true, // 内置表单组件 selector 筛选列时使用，即 pure 为 true 时，该列会显示在 selector 表格中
    edit: {
      /**
       * 表单控件类型，内置支持大部分 antd 表单组件，也可以自定义
       */
      type: 'input',

      /**
       * 配置与 antd FormItem props 一致，支持 antd FormItem 的所有属性
       */
      formItem: {
        placeholder: '请输入姓名', // 支持 string 和 返回 string 的函数
        required: true,
      },

      /**
       * 输入框配置，当 type 为 input 时有效，支持 antd Input 的所有属性
       * 注意：控件的配置字段名与 type 是一致的：比如 type 为 'select' 时，配置字段名是 select
       * 如果是自定义的控件，则通过 customComponent 字段传入配置
       */
      input: {}
    },

    customHeaderRender: (data: {
      column: StdTableColumn
      title: string
    }) => {
      return <div>自定义表头</div>
    },

    /**
     * record 为当前行数据，text 为当前单元格的数据
     * 返回 string 或 JSX Element 或 VNode
     */
    customRender: ({ record, text }: CustomRenderArgs<any>) => {},

    hiddenInTable: false,
    hiddenInEdit: false,
    hiddenInAdd: false,
    hiddenInDetail: false,
    hiddenInExport: false,
  }
]
```

## Types Definition

```ts
interface StdTableHeaderScope {
  title: string
  column: any
}

type CustomHeaderRenderFn = (data: StdTableHeaderScope) => VNode | JSX.Element

type CustomRenderFn = ((props: CustomRenderArgs<T>) => VNode | VNode[] | JSX.Element | JSX.Element[] | string | string[])

interface StdTableColumn<T = any> extends Omit<TableColumnType, 'customRender'> {
  title: string | (() => string)
  dataIndex: string | string[]
  customHeaderRender?: CustomHeaderRenderFn
  pure?: boolean
  search?: boolean | StdFormConfig
  edit?: StdFormConfig
  customRender?: CustomRenderFn
  hiddenInTable?: boolean
  hiddenInEdit?: boolean
  hiddenInAdd?: boolean
  hiddenInDetail?: boolean
  hiddenInExport?: boolean
}
```
