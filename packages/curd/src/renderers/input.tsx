import type { CustomRenderArgs } from '../types/props'

export function hideMiddleFour(props: CustomRenderArgs) {
  if (!props.text || props.text.length <= 4)
    return <span>{props.text}</span>

  const start = props.text.substring(0, Math.floor((props.text.length - 4) / 2))
  const end = props.text.substring(start.length + 4)

  return <span>{`${start}****${end}`}</span>
}
