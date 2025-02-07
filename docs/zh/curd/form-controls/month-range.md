# 月份范围选择器

月份范围选择器用于选择月份范围。

## 基础用法

```ts
const config = {
  type: 'monthRange',
  formItem: {
    label: '统计月份'
  },
  monthRange: {
    format: 'YYYY-MM',
    placeholder: ['开始月份', '结束月份'],
    allowClear: true,
    ranges: {
      今年: [dayjs().startOf('year'), dayjs().endOf('year')],
      去年: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')]
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
    title: '统计月份',
    dataIndex: 'statisticsMonth',
    edit: {
      type: 'monthRange',
      formItem: {
        required: true
      },
      monthRange: {
        format: 'YYYY-MM',
        placeholder: ['开始月份', '结束月份'],
        ranges: {
          今年: [dayjs().startOf('year'), dayjs().endOf('year')],
          去年: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')],
          近半年: [dayjs().subtract(6, 'month').startOf('month'), dayjs().endOf('month')]
        }
      }
    }
  }
]
</script>
```
