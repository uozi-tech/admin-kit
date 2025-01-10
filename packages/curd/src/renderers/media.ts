import type { CustomRenderArgs } from '../types/props'
import { Image } from 'ant-design-vue'
import { h } from 'vue'

export function image(props: CustomRenderArgs) {
  return h(Image, { src: props.text })
}
