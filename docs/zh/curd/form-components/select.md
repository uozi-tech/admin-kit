# 选择

配置与 antd select 一致，参考：[select props](https://antdv.com/components/select-cn#api)

额外扩展配置：

```ts
interface SelectExtraConfig {
  remote?: {
    // value 值在返回数据中对应的 key
    valueKey: string
    // label 值在返回数据中对应的 key
    labelKey: string

    api: (...args: any[]) => Promise<{ data: any[] }>
  }
  // value 与 label 的映射 map
  // 如：{ 1: 'Active', 2: 'Ban' }
  mask?: Record<string | number, any>
  valueKey?: string
}
```
