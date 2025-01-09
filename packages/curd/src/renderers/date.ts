import type { CustomRenderArgs } from '../types/props'
import dayjs from 'dayjs'
import { isNumber } from 'lodash-es'
import { Format } from '../constants'

export function dateRender(props: CustomRenderArgs): string {
  if (!props.text) {
    return '/'
  }
  if (isNumber(props.text)) {
    return dayjs.unix(props.text).format(Format.date)
  }

  return dayjs(props.text).format(Format.date)
}

export function datetimeRender(props: CustomRenderArgs): string {
  if (!props.text) {
    return '/'
  }
  if (isNumber(props.text)) {
    return dayjs.unix(props.text).format(Format.datetime)
  }

  return dayjs(props.text).format(Format.datetime)
}

// Used in Export
dateRender.isDate = true
datetimeRender.isDatetime = true
