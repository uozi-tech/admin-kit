import type { Ref } from 'vue'
import type { AppBreadcrumbItem } from '../props'
import { inject } from 'vue'

export function useBreadcrumbs() {
  return inject('breadList') as Ref<AppBreadcrumbItem[]>
}
