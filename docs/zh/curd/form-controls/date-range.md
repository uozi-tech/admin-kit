# 日期范围选择器

日期范围选择器用于选择日期范围。

## 基础用法

```ts
const config = {
  type: 'dateRange',
  formItem: {
    label: '时间范围'
  },
  dateRange: {
    format: 'YYYY-MM-DD',
    placeholder: ['开始日期', '结束日期'],
    allowClear: true,
    ranges: {
      今天: [dayjs(), dayjs()],
      本周: [dayjs().startOf('week'), dayjs().endOf('week')],
      本月: [dayjs().startOf('month'), dayjs().endOf('month')]
    }
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
    title: '统计时间',
    dataIndex: 'dateRange',
    edit: {
      type: 'dateRange',
      formItem: {
        required: true
      },
      dateRange: {
        format: 'YYYY-MM-DD',
        placeholder: ['开始日期', '结束日期'],
        ranges: [
          { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
          { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
          { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
          { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
        ]
      }
    }
  }
]
</script>
```
