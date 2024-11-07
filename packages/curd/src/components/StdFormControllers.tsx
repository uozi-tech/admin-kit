import {
  TimePicker,
  Switch,
  Checkbox,
  Slider,
  Rate,
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  Select,
  UploadDragger, RangePicker,
} from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import { StdTableColumn } from '../types'
import { get, isArray, set } from 'lodash-es'
import { Format } from '../constants'
import { i18n } from '../i18n'
import { Reactive } from 'vue'

export default function getInternalFormController(
  formData: Reactive<Record<string, any>>,
  form: StdTableColumn['edit'],
  dataIndex: StdTableColumn['dataIndex'],
  lang: string,
) {
  const key = form?.formItem?.name ?? dataIndex
  const value = ref(get(formData, key))

  watch(value, v => {
    set(formData, key, v)
  })

  switch (form?.type) {
    case 'input':
      return <Input v-model:value={value.value} {...form?.input} />
    case 'inputNumber':
      return <InputNumber v-model:value={value.value} {...form?.inputNumber} />
    case 'select':
      return (
        <Select
          v-model:value={value.value}
          dropdownMatchSelectWidth={false}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
          {...form?.select}
        />
      )
    case 'cascader':
      return <Cascader v-model:value={value.value} getPopupContainer={(triggerNode: any) => triggerNode.parentNode} {...form?.cascader} />
    case 'checkbox':
      return <Checkbox v-model:checked={value.value} {...form?.checkbox} />
    case 'date':
    case 'datetime':
    case 'year':
    case 'month':
    case 'week':
      return (
        <DatePicker
          picker={form?.type === 'datetime' ? undefined : form?.type}
          v-model:value={value.value}
          valueFormat={Format[form?.type]}
          format={Format[form?.type]}
          showTime={form?.type === 'datetime'}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
          {...form[form?.type]}
        />
      )
    case 'time':
      return (
        <TimePicker
          v-model:value={value.value}
          valueFormat={Format[form?.type]}
          fotmat={Format[form?.type]}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
          {...form?.time}
        />
      )
    case 'dateRangePicker':
    case 'datetimeRangePicker':
    case 'yearRangePicker':
    case 'monthRangePicker':
    case 'weekRangePicker':
    case 'timeRangePicker': {
      const pickerType = form?.type?.replace('RangePicker', '')

      return <RangePicker
        v-model:value={value.value}
        picker={pickerType}
        valueFormat={Format[pickerType]}
        format={Format[pickerType]}
        show-time={pickerType === 'datetime'}
      />
    }
    case 'switch':
      return <Switch v-model:checked={value.value} {...form?.switch} />
    case 'slider':
      return (
        <div style="padding: 0 6px">
          <Slider v-model:value={value.value} {...form?.slider} />
        </div>
      )
    case 'rate':
      return <Rate v-model:value={value.value} {...form?.rate} />
    case 'upload':
      const fileUrls: string | string[] = value.value
      let fileList
      if (isArray(fileUrls)) 
        fileList = fileUrls.map(item => ({ uid: item, name: item, status: 'done', url: item }))
      else 
        fileList = [
          {
            uid: fileUrls,
            name: fileUrls,
            url: fileUrls,
          },
        ]
      
      return (
        <UploadDragger fileList={fileList}>
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text"> 
            {' '}
            {i18n[lang].upload}
            {' '}
          </p>
        </UploadDragger>
      )

    default:
      return null
  }
}
