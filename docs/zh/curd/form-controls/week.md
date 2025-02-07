# 周选择器

周选择器用于选择周。

## 基础用法

```ts
const config = {
  type: 'week',
  formItem: {
    label: '统计周'
  },
  week: {
    format: 'YYYY-wo',
    placeholder: '请选择周',
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
    title: '统计周',
    dataIndex: 'statisticsWeek',
    edit: {
      type: 'week',
      formItem: {
        required: true
      },
      week: {
        format: 'YYYY-wo',
        placeholder: '请选择统计周',
        disabledDate: (current) => {
          return current && current > moment().endOf('week')
        }
      }
    }
  },
  {
    title: '排班周',
    dataIndex: 'scheduleWeek',
    edit: {
      type: 'week',
      formItem: {
        label: '排班周'
      },
      week: {
        format: 'YYYY [Week] wo',
        placeholder: '请选择排班周'
      }
    }
  }
]
</script>
```
