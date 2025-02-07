# 时间范围选择器

时间范围选择器用于选择时间范围。

## 基础用法

```ts
const config = {
  type: 'timeRange',
  formItem: {
    label: '营业时间'
  },
  timeRange: {
    format: 'HH:mm:ss',
    placeholder: ['开始时间', '结束时间'],
    hourStep: 1,
    minuteStep: 30
  }
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| order | 始末时间是否自动排序 | boolean | true |
| disabledTime | 不可选择的时间 | RangeDisabledTime | - |

```ts
type RangeDisabledTime = (
  now: Dayjs,
  type = 'start' | 'end',
) => {
  disabledHours?: () => number[]
  disabledMinutes?: (selectedHour: number) => number[]
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[]
}
```

更多属性请参考 [Ant Design Vue TimePicker](https://www.antdv.com/components/time-picker-cn#api)

## 示例

```vue
<script setup lang="ts">
const columns = [
  {
    title: '营业时间',
    dataIndex: 'businessHours',
    edit: {
      type: 'timeRange',
      formItem: {
        required: true
      },
      timeRange: {
        format: 'HH:mm',
        placeholder: ['开始时间', '结束时间'],
        hourStep: 1,
        minuteStep: 30,
        disabledTime: (now, type) => {
          if (type === 'start') {
            return {
              disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23]
            }
          }
        }
      }
    }
  },
  {
    title: '工作时间',
    dataIndex: 'workTime',
    edit: {
      type: 'timeRange',
      formItem: {
        label: '工作时间'
      },
      timeRange: {
        format: 'h:mm a',
        use12Hours: true,
        placeholder: ['上班时间', '下班时间'],
        hourStep: 1,
        minuteStep: 30
      }
    }
  }
]
</script>
```
