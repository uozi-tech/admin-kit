import { set } from 'lodash-es'

/**
 * 表单字段联动工具函数
 */

/**
 * 创建通用联动处理函数
 * @param linkageMap 联动映射配置
 * @returns 联动处理函数
 */
export function createCustomLinkage(
  linkageMap: Record<string, (dependencies: Record<string, any>) => any>,
) {
  return (value: any, formData: Record<string, any>, dependencies: Record<string, any>) => {
    Object.entries(linkageMap).forEach(([targetField, computeFn]) => {
      try {
        const computedValue = computeFn(dependencies)
        if (computedValue !== undefined) {
          set(formData, targetField, computedValue)
        }
      }
      catch (error) {
        console.warn(`字段 ${targetField} 联动计算出错:`, error)
      }
    })
  }
}
