# 周范围选择器

周范围选择器用于选择周范围。

## 基础用法

```ts
const config = {
  type: 'weekRange',
  formItem: {
    label: '统计周期'
  },
  weekRange: {
    format: 'YYYY-wo',
    placeholder: ['开始周', '结束周'],
    allowClear: true,
    ranges: [
      { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
      { label: '上月', value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')] },
    ]
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
    title: '统计周期',
    dataIndex: 'statisticsWeeks',
    edit: {
      type: 'weekRange',
      formItem: {
        required: true
      },
      weekRange: {
        format: 'YYYY-wo',
        placeholder: ['开始周', '结束周'],
        ranges: [
          { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
          { label: '上月', value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')] },
        ]
      }
    }
  }
]
</script>
```
