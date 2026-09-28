import type { StdFormConfig, StdTableColumn } from '../../types'
import { describe, expect, it } from 'vitest'
import { getPlaceholder } from '../../utils'

describe('placeholder function', () => {
  it('should fall back to the column title when no placeholder is configured', () => {
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

    expect(getPlaceholder(column, formItem)).toBe('Name')
  })

  it('should prefer the configured placeholder', () => {
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

    expect(getPlaceholder(column, formItem)).toBe('Existing Placeholder')
  })
})
