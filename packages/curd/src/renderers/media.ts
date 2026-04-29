import type { CustomRenderArgs } from '../types/props'
import { Image } from 'antdv-next'
import { h } from 'vue'

export function image(props: CustomRenderArgs) {
  return h(Image, { src: props.text })
}
