# 日期时间范围选择器

日期时间范围选择器用于选择日期时间范围。

## 基础用法

```ts
const config = {
  type: 'datetimeRange',
  formItem: {
    label: '活动时间'
  },
  datetimeRange: {
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: ['开始时间', '结束时间'],
    showTime: {
      format: 'HH:mm:ss',
      defaultValue: [
        dayjs('00:00:00', 'HH:mm:ss'),
        dayjs('23:59:59', 'HH:mm:ss')
      ]
    }
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
    title: '活动时间',
    dataIndex: 'activityTime',
    edit: {
      type: 'datetimeRange',
      formItem: {
        required: true
      },
      datetimeRange: {
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: ['开始时间', '结束时间'],
        showTime: {
          format: 'HH:mm:ss',
          hourStep: 1,
          minuteStep: 5,
          secondStep: 10,
          defaultValue: [
            dayjs('00:00:00', 'HH:mm:ss'),
            dayjs('23:59:59', 'HH:mm:ss')
          ]
        },
        ranges: [
          { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
          { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
          { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
          { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
        ],
        timestamp: false,
      }
    }
  }
]
</script>
