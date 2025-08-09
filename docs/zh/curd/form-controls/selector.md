# 选择器

选择器用于从远程数据源中选择一个或多个选项。与普通选择器不同，选择器支持更复杂的远程数据加载和展示。

## 基础用法

```ts
const config = {
  type: 'selector',
  formItem: {
    label: '用户'
  },
  selector: {
    api: '/api/users',
    displayKey: 'name',
    valueKey: 'id',
    columns: [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '姓名',
        dataIndex: 'name'
      }
    ]
  }
}
```

## API

### 特有属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableProps | 表格属性 | TableProps | - |
| valueKey | 实际选择的数据字段名 | string | 'id' |
| displayKey | 展示数据的字段名 | string | - |
| selectionType | 选择类型 | 'radio' \| 'checkbox' | 'radio' |
| getListApi | 列表数据api | CurdApi['getList'] | - |
| columns | 表格列配置 | TableColumnType[] | - |
| tips | 提示文字 | string | - |
| disabled | 是否禁用 | boolean | false |
| hideInputContainer | 是否隐藏输入容器 | boolean | false |
| modalWidth | 弹窗宽度 | number \| string | - |
| placeholder | 选择框默认文字 | PlaceholderT | - |
| overwriteParams | 覆盖请求参数 | Record<string, any> | - |
| labelRender | 自定义 label 渲染函数 | (row: any) => string | - |
| omitZeroString | 是否过滤掉值为 "0" 的字符串 | boolean | 全局配置 |
| dropUnpreloadable | 是否过滤掉无法预加载的选项，只保留能成功加载数据的 valueKey | boolean | false |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| selectedRecords | 选择记录 | records: any[] |


```ts
export interface PlaceholderT { placeholder?: number | string | (() => string) }

export type SelectorConfig = {
  tableProps?: TableProps
  valueKey?: string
  displayKey?: string
  selectionType?: 'radio' | 'checkbox'
  getListApi: CurdApi['getList']
  columns: StdTableColumn[]
  tips?: string
  disabled?: boolean
  hideInputContainer?: boolean
  modalWidth?: number | string
  overwriteParams?: Record<string, any>
  labelRender?: (row: any) => string
  omitZeroString?: boolean
  dropUnpreloadable?: boolean
} & PlaceholderT
```

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '负责人',
    dataIndex: 'owner',
    edit: {
      type: 'selector',
      formItem: {
        required: true
      },
      selector: {
        getListApi: () => Promise.resolve({
          data: [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' }
          ]
        }),
        labelKey: 'name',
        valueKey: 'id',
        columns: [
          {
            title: '工号',
            dataIndex: 'code',
            width: 100
          },
          {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
            search: {
              type: 'input',
            }
          },
          {
            title: '部门',
            dataIndex: 'department'
          }
        ],
        omitZeroString: true
      }
    }
  },
  {
    title: '审批人',
    dataIndex: 'approvers',
    edit: {
      type: 'selector',
      formItem: {
        label: '审批人'
      },
      selector: {
        getListApi: () => Promise.resolve({
          data: [
            { id: 1, name: '张三' },
            { id: 2, name: '李四' }
          ]
        }),
        labelKey: 'name',
        valueKey: 'id',
        selectionType: 'checkbox',
        columns: [
          {
            title: '姓名',
            dataIndex: 'name'
          },
          {
            title: '职位',
            dataIndex: 'position'
          }
        ]
      }
    }
  }
]
</script>
```
