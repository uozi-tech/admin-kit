import type { StdTableColumn } from '../types'
import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import StdForm from '../components/StdForm.vue'

describe('stdForm 组件', () => {
  const mockColumns: StdTableColumn[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      edit: {
        type: 'input',
        formItem: {
          name: 'name',
        },
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      edit: {
        type: 'inputNumber',
        formItem: {
          name: 'age',
        },
      },
    },
  ]

  it('应该正确渲染表单项', () => {
    const { getByText } = render(StdForm, {
      props: {
        columns: mockColumns,
        data: {},
      },
    })

    expect(getByText('姓名')).toBeTruthy()
    expect(getByText('年龄')).toBeTruthy()
  })

  it('应该正确绑定表单数据', async () => {
    const formData = {
      name: '张三',
      age: 18,
    }

    const { getByLabelText } = render(StdForm, {
      props: {
        columns: mockColumns,
        data: formData,
      },
    })

    const nameInput = getByLabelText('姓名') as HTMLInputElement
    const ageInput = getByLabelText('年龄') as HTMLInputElement

    expect(nameInput.value).toBe('张三')
    expect(ageInput.value).toBe('18')
  })

  // it('应该正确处理表单提交', async () => {
  //   const onSubmit = vi.fn()
  //   const { getByRole } = render(StdForm, {
  //     props: {
  //       columns: mockColumns,
  //       data: {},
  //       onSubmit,
  //     },
  //   })

  //   const form = getByRole('form')
  //   await fireEvent.submit(form)

  //   expect(onSubmit).toHaveBeenCalled()
  // })
})
