# 级联选择

级联选择器用于从一组相关联的数据集合中进行选择。

## 基础用法

```ts
const config = {
  type: 'cascader',
  formItem: {
    label: '地区'
  },
  cascader: {
    options: [
      {
        value: 'zhejiang',
        label: '浙江',
        children: [
          {
            value: 'hangzhou',
            label: '杭州',
            children: [
              {
                value: 'xihu',
                label: '西湖'
              }
            ]
          }
        ]
      }
    ],
    placeholder: '请选择地区'
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认值 | string[] \| number[] | - |
| value(v-model) | 值 | string[] \| number[] | - |
| options | 可选项数据源 | Option[] | - |
| placeholder | 输入框占位文本 | string | - |
| size | 输入框大小 | 'large' \| 'default' \| 'small' | 'default' |
| disabled | 禁用 | boolean | false |
| allowClear | 是否支持清除 | boolean | true |
| showSearch | 在选择框中显示搜索框 | boolean \| object | false |
| changeOnSelect | （单选时生效）当此项为 true 时，点选每级菜单选项值都会发生变化 | boolean | false |
| expandTrigger | 次级菜单的展开方式 | 'click' \| 'hover' | 'click' |

其它属性请参考 [Ant Design Vue Cascader](https://www.antdv.com/components/cascader-cn#api)

```ts
interface Option {
  value: string | number
  label: string
  disabled?: boolean
  children?: Option[]
}

interface ShowSearch {
  filter: (inputValue: string, path: Option[]) => boolean
  limit: number | false
  matchInputWidth: boolean
  render: (inputValue: string, path: Option[]) => VNode
  sort: (a: Option, b: Option) => number
}
```

更多属性请参考 [Ant Design Vue Cascader](https://www.antdv.com/components/cascader-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '地区',
    dataIndex: 'area',
    edit: {
      type: 'cascader',
      formItem: {
        required: true
      },
      cascader: {
        options: [
          {
            value: 'zhejiang',
            label: '浙江',
            children: [
              {
                value: 'hangzhou',
                label: '杭州',
                children: [
                  {
                    value: 'xihu',
                    label: '西湖'
                  }
                ]
              }
            ]
          }
        ],
        showSearch: true,
        changeOnSelect: true,
        placeholder: '请选择地区'
      }
    }
  }
]
</script>
```
