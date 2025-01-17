import type { CustomRenderArgs } from '../types/props'

export function hiddenMiddleText(len: number = 4) {
  return (props: CustomRenderArgs) => {
    if (!props.text || props.text.length <= len)
      return <span>{props.text}</span>

    const start = props.text.substring(0, Math.floor((props.text.length - len) / 2))
    const end = props.text.substring(start.length + len)

    return <span>{`${start}${'****'.repeat(len)}${end}`}</span>
  }
}
