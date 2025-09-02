# 日期选择器

日期选择器用于选择日期。

## 基础用法

<demo vue="../../../demos/curd/form-controls/date-demo.vue" title="日期时间控件" description="展示各种日期时间选择器的配置选项，包括单日期、范围日期、时间选择等功能"></demo>

```ts
const config = {
  type: 'date',
  formItem: {
    label: '生日'
  },
  date: {
    format: 'YYYY-MM-DD',
    placeholder: '请选择日期',
    allowClear: true
  }
}
```

## API

请参考 [Ant Design Vue DatePicker](https://www.antdv.com/components/date-picker-cn#api)

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| timestamp | 是否使用时间戳 | boolean | 继承 `curdConfig.time.timestamp` |

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '生日',
    dataIndex: 'birthday',
    edit: {
      type: 'date',
      formItem: {
        required: true
      },
      date: {
        format: 'YYYY-MM-DD',
        placeholder: '请选择生日',
        disabledDate: (current) => {
          return current && current > moment().endOf('day')
        }
        timestamp: false
      }
    }
  }
]
</script>
```
