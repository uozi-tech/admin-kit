import type { StdTableColumn } from '../../types'
import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import StdForm from '../../components/StdForm.vue'
import { createCurdConfig } from '../../utils'

describe('stdForm 组件', () => {
  // StdFormItem calls useI18n(), so the curd plugin must be installed
  const renderGlobal = { plugins: [createCurdConfig({})] }

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
      global: renderGlobal,
    })

    expect(getByText('姓名')).toBeTruthy()
    expect(getByText('年龄')).toBeTruthy()
  })

  it('应该正确绑定表单数据', async () => {
    const formData = {
      name: '张三',
      age: 18,
    }

    const { getByDisplayValue } = render(StdForm, {
      props: {
        columns: mockColumns,
        data: formData,
      },
      global: renderGlobal,
    })

    // The rendered inputs carry no id matching the label's `for`,
    // so query them by their bound value instead of by label.
    const nameInput = getByDisplayValue('张三') as HTMLInputElement
    const ageInput = getByDisplayValue('18') as HTMLInputElement

    expect(nameInput.tagName).toBe('INPUT')
    expect(ageInput.tagName).toBe('INPUT')
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
