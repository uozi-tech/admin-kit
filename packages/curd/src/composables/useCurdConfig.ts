import type { CurdConfigT } from '../index'
import { inject } from 'vue'
import { CURD_CONFIG_KEY, defaultConfig } from '../index'

export function useCurdConfig() {
  return inject<Required<CurdConfigT>>(CURD_CONFIG_KEY, defaultConfig as Required<CurdConfigT>)
}

export default useCurdConfig
