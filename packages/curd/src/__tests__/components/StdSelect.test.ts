import { fireEvent, render, waitFor } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import StdSelect from '~curd/components/form/StdSelect.vue'

describe('stdSelect 组件', () => {
  it('应该正确渲染选择框', () => {
    const { getByRole } = render(StdSelect)
    expect(getByRole('combobox')).toBeTruthy()
  })

  // it('应该正确显示静态选项', async () => {
  //   const options = [
  //     { label: '选项1', value: 1 },
  //     { label: '选项2', value: 2 },
  //   ]

  //   const { getByRole, getByText } = render(StdSelect, {
  //     props: {
  //       props: {
  //         options,
  //       },
  //     },
  //   })

  //   const select = getByRole('combobox')
  //   await fireEvent.click(select)

  //   expect(getByText('选项1')).toBeTruthy()
  //   expect(getByText('选项2')).toBeTruthy()
  // })

  // it('应该正确处理远程数据', async () => {
  //   const mockApi = vi.fn().mockResolvedValue({
  //     data: [
  //       { id: 1, name: '选项1' },
  //       { id: 2, name: '选项2' },
  //     ],
  //   })

  //   const { getByRole, getByText } = render(StdSelect, {
  //     props: {
  //       props: {
  //         remote: {
  //           api: mockApi,
  //           valueKey: 'id',
  //           labelKey: 'name',
  //         },
  //       },
  //     },
  //   })

  //   await waitFor(() => {
  //     expect(mockApi).toHaveBeenCalled()
  //   })

  //   const select = getByRole('combobox')
  //   await fireEvent.click(select)

  //   expect(getByText('选项1')).toBeTruthy()
  //   expect(getByText('选项2')).toBeTruthy()
  // })

  // it('应该正确处理掩码选项', async () => {
  //   const { getByRole, getByText } = render(StdSelect, {
  //     props: {
  //       props: {
  //         mask: {
  //           1: '选项1',
  //           2: '选项2',
  //         },
  //       },
  //     },
  //   })

  //   const select = getByRole('combobox')
  //   await fireEvent.click(select)

  //   expect(getByText('选项1')).toBeTruthy()
  //   expect(getByText('选项2')).toBeTruthy()
  // })
})
