import type { StdFormConfig, StdTableColumn } from '../../types'
import { describe, expect, it } from 'vitest'
import { placeholder } from '../../utils'

describe('placeholder function', () => {
  it('should set placeholder when formItem does not have a placeholder', () => {
    const column: StdTableColumn = {
      title: 'Name',
      dataIndex: 'name',
    }
    const formItem: StdFormConfig = {
      type: 'input',
      formItem: {
        name: 'inputName',
      },
    }

    placeholder(column, formItem)

    expect(formItem.input).toEqual({
      placeholder: 'Name',
    })
  })

  it('should not set placeholder when formItem already has a placeholder', () => {
    const column: StdTableColumn = {
      title: 'Name',
      dataIndex: 'name',
    }
    const formItem: StdFormConfig = {
      type: 'input',
      formItem: {
        name: 'inputName',
      },
      input: {
        placeholder: 'Existing Placeholder',
      },
    }

    placeholder(column, formItem)

    expect(formItem.input).toEqual({
      placeholder: 'Existing Placeholder',
    })
  })
})
