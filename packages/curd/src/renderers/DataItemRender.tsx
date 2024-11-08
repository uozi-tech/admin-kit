import { CustomRenderOptions } from '../types'
import { get } from 'lodash-es'

export function DataItemRender(props: CustomRenderOptions) {
  const { record, column } = props
  const value = get(record, column.dataIndex)
  return column.customRender ? column.customRender(props) : value
}
