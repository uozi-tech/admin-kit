import type { CustomRenderArgs } from '../types/props'

export type MaskOptions = Record<string | number, any>

export function maskRender(maskOptions: MaskOptions) {
  return (options: CustomRenderArgs) => {
    let v: any
    if (typeof maskOptions[options.text] === 'function')
      v = maskOptions[options.text]()
    else
      v = maskOptions[options.text]

    return v ?? '/'
  }
}
