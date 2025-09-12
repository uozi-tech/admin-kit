# 日期控件

日期时间控件用于选择日期、时间或日期时间范围，支持多种格式和本地化配置。

## 演示

<demo vue="../demos/curd/form-controls/date-controls.vue" />

## 日期选择器 (date)

用于选择单个日期。

```ts
{
  title: '出生日期',
  dataIndex: 'birth_date',
  edit: {
    type:'date',
    date: {
      format: 'YYYY-MM-DD',
    },
    placeholder: '请选择出生日期'
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| format | 日期格式 | string | 'YYYY-MM-DD' |
| placeholder | 占位符 | string | - |
| disabledDate | 禁用日期 | (date: Dayjs) => boolean | - |
| showToday | 显示今天按钮 | boolean | true |
| allowClear | 允许清空 | boolean | true |

> 更多配置请参考 [DatePickerProps](https://antdv.com/components/date-picker#api)

## 时间选择器 (time)

用于选择时间。

```ts
{
  title: '营业时间',
  dataIndex: 'business_time',
  edit: {
    type:'time',
    time: {
      format: 'HH:mm:ss',
    },
    placeholder: '请选择时间'
  }
}
```


### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| format | 时间格式 | string | 'HH:mm:ss' |
| hourStep | 小时步长 | number | 1 |
| minuteStep | 分钟步长 | number | 1 |
| secondStep | 秒步长 | number | 1 |
| use12Hours | 12小时制 | boolean | false |

> 更多配置请参考 [TimePickerProps](https://antdv.com/components/time-picker#api)

## 日期时间选择器 (datetime)

用于选择日期和时间。

```ts
{
  title: '预约时间',
  dataIndex: 'appointment_time',
  edit: {
    type:'datetime',
    datetime: {
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    placeholder: '请选择预约时间'
  }
}
```

## 日期范围选择器 (dateRange)

用于选择日期范围。

```ts
{
  title: '活动时间',
  dataIndex: 'activity_period',
  edit: {
    type:'dateRange',
    dateRange: {
      format: 'YYYY-MM-DD',
    },
    placeholder: ['开始日期', '结束日期']
  }
}
```

### 配置选项

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| placeholder | 占位符 | [string, string] | - |
| separator | 分隔符 | string | '~' |
| ranges | 预设范围 | object | - |

> 更多配置请参考 [RangePickerProps](https://antdv.com/components/date-picker#api)

## 时间范围选择器 (timeRange)

用于选择时间范围。

```ts
{
  title: '工作时间',
  dataIndex: 'work_hours',
  edit: {
    type:'timeRange',
    timeRange: {
      format: 'HH:mm',
    },
    placeholder: ['开始时间', '结束时间']
  }
}
```

## 日期时间范围选择器 (datetimeRange)

用于选择日期时间范围。

```ts
{
  title: '会议时间',
  dataIndex: 'meeting_period',
  edit: {
    type:'datetimeRange',
    datetimeRange: {
      format: 'YYYY-MM-DD HH:mm',
    },
    placeholder: ['开始时间', '结束时间']
  }
}
```

## 特殊日期选择器

### 年份选择器 (year)

```ts
{
  title: '毕业年份',
  dataIndex: 'graduation_year',
  edit: {
    type:'year',
    placeholder: '请选择年份'
  }
}
```

### 月份选择器 (month)

```ts
{
  title: '统计月份',
  dataIndex: 'stat_month',
  edit: {
    type:'month',
    month: {
      format: 'YYYY-MM',
    },
    placeholder: '请选择月份'
  }
}
```

### 周选择器 (week)

```ts
{
  title: '统计周',
  dataIndex: 'stat_week',
  edit: {
    type:'week',
    week: {
      format: 'YYYY-wo',
    },
    placeholder: '请选择周'
  }
}
```

## 高级配置

### 禁用特定日期

```ts
{
  title: '预约日期',
  dataIndex: 'booking_date',
  edit: {
    type:'date',
    date: {
      disabledDate: (current) => {
        // 禁用过去的日期和周末
        const today = dayjs().startOf('day')
        const isWeekend = current.day() === 0 || current.day() === 6
        return current < today || isWeekend
      }
    }
  }
}
```

### 预设时间范围

```ts
{
  title: '查询时间',
  dataIndex: 'query_period',
  edit: {
    type:'dateRange',
    dateRange: {
      ranges: {
        '今天': [dayjs(), dayjs()],
        '本周': [dayjs().startOf('week'), dayjs().endOf('week')],
        '本月': [dayjs().startOf('month'), dayjs().endOf('month')],
        '最近7天': [dayjs().subtract(6, 'day'), dayjs()],
        '最近30天': [dayjs().subtract(29, 'day'), dayjs()]
      }
    }
  }
}
```

### 自定义格式化

```ts
{
  title: '创建时间',
  dataIndex: 'created_at',
  edit: {
    type:'datetime',
    datetime: {
      format: 'YYYY年MM月DD日 HH:mm',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'  // 提交给后端的格式
    },
  }
}
```

## 国际化配置

### 中文本地化

```ts
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

{
  title: '日期',
  dataIndex: 'date',
  edit: {
    type:'date',
    date: {
      locale: 'zh-cn'
    }
  }
}
```

### 自定义本地化

```ts
{
  title: '日期',
  dataIndex: 'date',
  edit: {
    type:'date',
    date: {
      locale: {
        lang: {
          placeholder: '请选择日期',
          rangePlaceholder: ['开始日期', '结束日期'],
          today: '今天',
          now: '此刻',
          backToToday: '返回今天',
          ok: '确定',
          clear: '清除',
          month: '月',
          year: '年',
          timeSelect: '选择时间',
          dateSelect: '选择日期',
        }
      }
    }
  }
}
```

## 使用示例

### 活动管理表单

```vue
<script setup lang="ts">
import { StdForm } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'
import dayjs from 'dayjs'

const activityApi = useCurdApi('/activities')

const columns = [
  {
    title: '活动名称',
    dataIndex: 'name',
    edit: {
      type:'input',
      formItem: {
        required: true
      }
    }
  },
  {
    title: '活动日期',
    dataIndex: 'activity_date',
    edit: {
      type:'date',
      formItem: {
        required: true,
      },
      date: {
        disabledDate: (current) => current < dayjs().startOf('day')
      }
    }
  },
  {
    title: '活动时间',
    dataIndex: 'activity_time',
    edit: {
      type:'timeRange',
      formItem: {
        required: true,
      },
      placeholder: ['开始时间', '结束时间']
    }
  },
  {
    title: '报名截止时间',
    dataIndex: 'registration_deadline',
    edit: {
      type:'datetime',
      formItem: {
        required: true,
      },
      datetime: {
        disabledDate: (current) => current < dayjs().startOf('day')
      }
    }
  },
  {
    title: '统计周期',
    dataIndex: 'stat_period',
    edit: {
      type:'dateRange',
      formItem: {
        required: true,
      },
      dateRange: {
        ranges: {
          '本周': [dayjs().startOf('week'), dayjs().endOf('week')],
          '本月': [dayjs().startOf('month'), dayjs().endOf('month')],
          '本季度': [dayjs().startOf('quarter'), dayjs().endOf('quarter')]
        }
      }
    }
  }
]
</script>

<template>
  <StdForm :columns="columns" />
</template>
```

### 员工信息表单

```vue
<script setup lang="ts">
import { StdForm } from '@uozi-admin/curd'
import { useCurdApi } from '@uozi-admin/request'
import dayjs from 'dayjs'

const employeeApi = useCurdApi('/employees')

const columns = [
  {
    title: '出生日期',
    dataIndex: 'birth_date',
    edit: {
      type:'date',
      formItem: {
        required: true,
      },
      date: {
        disabledDate: (current) => {
          // 年龄必须在18-65岁之间
          const minDate = dayjs().subtract(65, 'year')
          const maxDate = dayjs().subtract(18, 'year')
          return current < minDate || current > maxDate
        }
      }
    }
  },
  {
    title: '入职日期',
    dataIndex: 'hire_date',
    edit: {
      type:'date',
      formItem: {
        required: true,
      },
      date: {
        disabledDate: (current) => current > dayjs()
      }
    }
  },
  {
    title: '工作时间',
    dataIndex: 'work_hours',
    edit: {
      type:'timeRange',
      formItem: {
        required: true,
      },
      timeRange: {
        placeholder: ['上班时间', '下班时间'],
        defaultValue: [dayjs('09:00', 'HH:mm'), dayjs('18:00', 'HH:mm')]
      }
    }
  },
  {
    title: '合同期限',
    dataIndex: 'contract_period',
    edit: {
      type:'dateRange',
      formItem: {
        required: true,
      },
      dateRange: {
        placeholder: ['合同开始日期', '合同结束日期']
      }
    }
  }
]
</script>

<template>
  <StdForm :columns="columns" />
</template>
```

## 日期控件对比

| 控件 | 选择内容 | 格式示例 | 适用场景 |
|------|----------|----------|----------|
| **date** | 日期 | 2023-12-25 | 生日、截止日期 |
| **time** | 时间 | 14:30:00 | 营业时间、提醒时间 |
| **datetime** | 日期时间 | 2023-12-25 14:30:00 | 预约时间、会议时间 |
| **dateRange** | 日期范围 | [2023-12-01, 2023-12-31] | 活动期间、统计区间 |
| **timeRange** | 时间范围 | [09:00, 18:00] | 工作时间、营业时间 |
| **datetimeRange** | 日期时间范围 | [2023-12-25 09:00, 2023-12-25 18:00] | 会议时间段 |
| **year** | 年份 | 2023 | 毕业年份、统计年度 |
| **month** | 月份 | 2023-12 | 统计月份、账期 |
| **week** | 周 | 2023-52周 | 统计周、排班周 |

## 相关内容

- [基础控件](./basic-controls) - 文本输入、数字输入等
- [选择控件](./selection-controls) - 下拉选择、单选、多选等
- [高级控件](./advanced-controls) - 上传、开关、滑块等