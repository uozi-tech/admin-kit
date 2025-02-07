# 数字输入框

数字输入框用于输入数值。

## 基础用法

```ts
const config = {
  type: 'number',
  formItem: {
    label: '年龄'
  },
  number: {
    min: 0,
    max: 100,
    precision: 0,
    step: 1
  }
}
```

## 带单位

```ts
{
  type: 'number',
  formItem: {
    label: '金额'
  },
  number: {
    min: 0,
    precision: 2,
    prefix: '¥',
    formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | slot | - |
| addonBefore | 带标签的 input，设置前置标签 | slot | - |
| autofocus | 自动获取焦点 | boolean | false |
| bordered | 是否有边框 | boolean | true |
| controls | 是否显示增减按钮 | boolean | true |
| decimalSeparator | 小数点 | string | - |
| defaultValue | 初始值 | number | - |
| disabled | 禁用 | boolean | false |
| formatter | 指定输入框展示值的格式 | function(value: number \| string, info: { userTyping: boolean, input: string }): string | - |
| keyboard | 是否启用键盘快捷行为 | boolean | true |
| max | 最大值 | number | Infinity |
| min | 最小值 | number | -Infinity |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | function( string): number | - |
| precision | 数值精度 | number | - |
| prefix | 带有前缀图标的 input | slot | - |
| size | 输入框大小 | string | - |
| status | 设置校验状态 | 'error' \| 'warning' | - |
| step | 每次改变步数，可以为小数 | number \| string | 1 |
| stringMode | 字符值模式，开启后支持高精度小数。同时 change 事件将返回 string 类型 | boolean | false |
| upIcon | 自定义上箭头图标 | slot | <UpOutlined /> |
| downIcon | 自定义下箭头图标 | slot | <DownOutlined /> |
| value(v-model) | 当前值 | number | - |

更多属性请参考 [Ant Design Vue InputNumber](https://www.antdv.com/components/input-number-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '年龄',
    dataIndex: 'age',
    edit: {
      type: 'number',
      formItem: {
        required: true,
        rules: [
          { type: 'number', min: 0, max: 100, message: '年龄必须在 0-100 之间' }
        ]
      },
      number: {
        min: 0,
        max: 100,
        precision: 0,
        step: 1
      }
    }
  },
  {
    title: '身高',
    dataIndex: 'height',
    edit: {
      type: 'number',
      formItem: {
        required: true
      },
      number: {
        min: 0,
        max: 300,
        precision: 1,
        step: 0.1,
        suffix: 'cm'
      }
    }
  },
  {
    title: '金额',
    dataIndex: 'amount',
    edit: {
      type: 'number',
      formItem: {
        required: true
      },
      number: {
        min: 0,
        precision: 2,
        step: 0.01,
        prefix: '¥',
        formatter: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: value => value.replace(/[$,\s]/g, '')
      }
    }
  }
]
</script>
```
