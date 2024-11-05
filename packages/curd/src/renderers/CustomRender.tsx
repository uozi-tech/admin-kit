import { CustomRenderOptions } from '../types'
import {get} from 'lodash-es'

export function CustomRender(props: CustomRenderOptions) {
  const { record, column } = props
  const value = get(record, column.dataIndex)
  const actualNode = column.customRender ? column.customRender(props) : value

  return actualNode
}