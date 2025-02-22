import type { TimeT } from '../../types'
import useCurdConfig from '../../composables/useCurdConfig'

export function isUingTimestamp(props?: TimeT) {
  const curdConfig = useCurdConfig()

  if (props?.timestamp !== undefined) {
    return props.timestamp === true
  }
  return curdConfig.time?.timestamp
}
