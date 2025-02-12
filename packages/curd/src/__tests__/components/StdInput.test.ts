import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import StdInput from '~curd/components/form/StdInput.vue'

describe('stdInput 组件', () => {
  it('应该正确渲染输入框', () => {
    const { getByRole } = render(StdInput)
    expect(getByRole('textbox')).toBeTruthy()
  })

  it('应该正确响应用户输入', async () => {
    const { getByRole, emitted } = render(StdInput)
    const input = getByRole('textbox')

    await fireEvent.update(input, 'test value')

    expect(emitted()['update:value'][0]).toEqual(['test value'])
  })

  it('应该正确应用 props', () => {
    const { getByPlaceholderText } = render(StdInput, {
      props: {
        props: {
          placeholder: '请输入',
          disabled: true,
        },
      },
    })

    const input = getByPlaceholderText('请输入')
    expect(input).toBeDisabled()
  })
})
