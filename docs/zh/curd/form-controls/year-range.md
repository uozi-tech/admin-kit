# 年份范围选择器

年份范围选择器用于选择年份范围。

## 基础用法

```ts
const config = {
  type: 'yearRange',
  formItem: {
    label: '统计年份'
  },
  yearRange: {
    format: 'YYYY',
    placeholder: ['开始年份', '结束年份'],
    allowClear: true,
    ranges: {
      近三年: [dayjs().subtract(2, 'year'), dayjs()],
      近五年: [dayjs().subtract(4, 'year'), dayjs()]
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
    title: '统计年份',
    dataIndex: 'statisticsYears',
    edit: {
      type: 'yearRange',
      formItem: {
        required: true
      },
      yearRange: {
        format: 'YYYY',
        placeholder: ['开始年份', '结束年份'],
        ranges: {
          近三年: [dayjs().subtract(2, 'year'), dayjs()],
          近五年: [dayjs().subtract(4, 'year'), dayjs()],
          近十年: [dayjs().subtract(9, 'year'), dayjs()]
        }
      }
    }
  }
]
</script>
```
