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
  UploadDragger,
  RangePicker,
} from 'ant-design-vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import { StdTableColumn, SelectOption } from '../types'
import { Ref, ref, watch } from 'vue'
import { get, isArray, set } from 'lodash-es'
import { FORMAT } from '../constants'
import { i18n } from '../i18n'

export default function getInternalFormController(
  api: any,
  formData: Ref<Record<string, any>>,
  form: StdTableColumn['form'],
  dataIndex: StdTableColumn['dataIndex'],
  lang: 'en' | 'zh-cn',
  isSearchForm?: boolean,
) {
  const selectOptions = ref<SelectOption[]>([])

  function search(query: string, key: string | string[], valueKey?: string) {
    if (isArray(key)) {
      key = key.join('.')
    }

    api.getList({ [key]: query }).then((res: unknown) => {
      selectOptions.value = (res as any).data.map((item: any) => ({ label: item[key], value: item[valueKey ?? key] }) as SelectOption)
    })
  }

  const key = form?.formItem?.name ?? dataIndex
  const value = ref(get(formData.value, key))

  watch(value, (v) => {
    set(formData.value, key, v)
  })

  if (isSearchForm && ['date', 'datetime', 'year', 'week', 'month', 'time'].includes(form?.type)) {
    return <RangePicker v-model:value={value.value} picker={form?.type} show-time={form?.type === 'datetime'} valueFormat={FORMAT[form?.type]} fotmat={FORMAT[form?.type]} />
  }

  switch (form?.type) {
    case 'input':
      return <Input v-model:value={value.value} {...form?.input} />
    case 'input-number':
      return <InputNumber v-model:value={value.value} {...form?.inputNumber} />
    case 'select':
      return (
        <Select
          v-model:value={value.value}
          dropdownMatchSelectWidth={false}
          remote-method={(query: string) => search(query, dataIndex as string, form?.select?.valueKey)}
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
          picker={form?.type}
          v-model:value={value.value}
          valueFormat={FORMAT[form?.type]}
          fotmat={FORMAT[form?.type]}
          show-time={form?.type === 'datetime'}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
          {...form[form?.type]}
        />
      )
    case 'time':
      return (
        <TimePicker
          value={value.value}
          valueFormat={FORMAT[form?.type]}
          fotmat={FORMAT[form?.type]}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
          {...form?.time}
        />
      )
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
      if (isArray(fileUrls)) {
        fileList = fileUrls.map((item) => ({ uid: item, name: item, status: 'done', url: item }))
      } else {
        fileList = [
          {
            uid: fileUrls,
            name: fileUrls,
            url: fileUrls,
          },
        ]
      }
      return (
        <UploadDragger fileList={fileList}>
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text"> {i18n[lang].upload} </p>
        </UploadDragger>
      )

    default:
      return null
  }
}