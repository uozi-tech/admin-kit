# 评分

评分控件用于打分和评级。

## 基础用法

```ts
const config = {
  type: 'rate',
  formItem: {
    label: '评分'
  },
  rate: {
    count: 5,
    allowHalf: true,
    tooltips: ['差', '一般', '良好', '优秀', '完美']
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 星星总数 | number | 5 |
| autoFocus | 自动聚焦 | boolean | false |
| allowHalf | 是否允许半选 | boolean | false |
| allowClear | 是否允许再次点击后清除 | boolean | true |
| tooltips | 自定义每项的提示信息 | string[] | - |
| character | 自定义字符 | string \| VNode | - |
| disabled | 是否禁用 | boolean | false |
| value(v-model) | 当前值 | number | - |

更多属性请参考 [Ant Design Vue Rate](https://www.antdv.com/components/rate-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '满意度',
    dataIndex: 'satisfaction',
    edit: {
      type: 'rate',
      formItem: {
        label: '满意度评分',
        required: true
      },
      rate: {
        count: 5,
        allowHalf: true,
        tooltips: ['很差', '较差', '一般', '较好', '很好']
      }
    }
  },
  {
    title: '推荐指数',
    dataIndex: 'recommendation',
    edit: {
      type: 'rate',
      formItem: {
        label: '推荐指数'
      },
      rate: {
        count: 3,
        character: '👍',
        tooltips: ['不推荐', '一般', '推荐']
      }
    }
  }
]
</script>
```
