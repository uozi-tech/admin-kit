# 日期选择器

日期选择器用于选择日期。

## 基础用法

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
      }
    }
  }
]
</script>
```
