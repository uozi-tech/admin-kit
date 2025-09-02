# 国际化

CURD 组件库提供完整的国际化支持，让您的应用能够轻松适配不同语言和地区。

## 基础配置

### 全局国际化设置

```ts
// main.ts
import { createCurdConfig } from '@uozi-admin/curd'

app.use(createCurdConfig({
  i18n: {
    // 设置默认语言
    locale: 'zh-CN',
    
    // 设置回退语言
    fallbackLocale: 'en-US',
    
    // 自定义文案
    messages: {
      'zh-CN': {
        // 通用操作
        view: '查看',
        edit: '编辑',
        delete: '删除',
        save: '保存',
        cancel: '取消',
        confirm: '确认',
        reset: '重置',
        search: '搜索',
        clear: '清空',
        
        // 表格相关
        'table.noData': '暂无数据',
        'table.loading': '加载中...',
        'table.total': '共 {total} 条',
        
        // 表单相关
        'form.required': '此字段为必填项',
        'form.invalid': '请检查表单内容',
        'form.saveSuccess': '保存成功',
        'form.saveFailed': '保存失败',
        
        // 操作确认
        'confirm.delete': '确定要删除这条记录吗？',
        'confirm.batchDelete': '确定要删除选中的 {count} 条记录吗？',
        
        // 批量操作
        'batch.selected': '已选择 {count} 项',
        'batch.edit': '批量编辑',
        'batch.delete': '批量删除',
        'batch.export': '批量导出'
      },
      'en-US': {
        view: 'View',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        reset: 'Reset',
        search: 'Search',
        clear: 'Clear',
        
        'table.noData': 'No Data',
        'table.loading': 'Loading...',
        'table.total': 'Total {total} items',
        
        'form.required': 'This field is required',
        'form.invalid': 'Please check the form content',
        'form.saveSuccess': 'Save successful',
        'form.saveFailed': 'Save failed',
        
        'confirm.delete': 'Are you sure to delete this record?',
        'confirm.batchDelete': 'Are you sure to delete {count} selected records?',
        
        'batch.selected': '{count} items selected',
        'batch.edit': 'Batch Edit',
        'batch.delete': 'Batch Delete',
        'batch.export': 'Batch Export'
      }
    }
  }
}))
```

## 使用国际化

### 在组件中使用

```vue
<script setup lang="ts">
import { useI18n } from '@uozi-admin/curd'

const { t, locale, setLocale } = useI18n()

// 切换语言
const switchLanguage = (lang: string) => {
  setLocale(lang)
}

// 使用翻译
const confirmMessage = computed(() => 
  t('confirm.delete')
)
</script>

<template>
  <div>
    <Button @click="switchLanguage('zh-CN')">中文</Button>
    <Button @click="switchLanguage('en-US')">English</Button>
    
    <p>{{ t('table.total', { total: 100 }) }}</p>
  </div>
</template>
```

### 列配置国际化

```ts
const columns = [
  {
    title: () => t('user.name'),  // 动态标题
    dataIndex: 'name',
    form: {
      control: 'input',
      placeholder: () => t('user.namePlaceholder'),
      rules: [
        { 
          required: true, 
          message: () => t('form.required') 
        }
      ]
    }
  },
  {
    title: () => t('user.status'),
    dataIndex: 'status',
    customRender: ({ value }) => {
      const statusMap = {
        active: () => t('status.active'),
        inactive: () => t('status.inactive')
      }
      return statusMap[value]?.() || value
    },
    form: {
      control: 'select',
      options: [
        { label: () => t('status.active'), value: 'active' },
        { label: () => t('status.inactive'), value: 'inactive' }
      ]
    }
  }
]
```

## 多语言文件管理

### 分离语言文件

```ts
// locales/zh-CN.ts
export default {
  common: {
    save: '保存',
    cancel: '取消',
    confirm: '确认',
    delete: '删除'
  },
  user: {
    name: '用户名',
    email: '邮箱',
    status: '状态',
    namePlaceholder: '请输入用户名',
    emailPlaceholder: '请输入邮箱地址'
  },
  status: {
    active: '启用',
    inactive: '禁用',
    pending: '待审核'
  },
  messages: {
    saveSuccess: '保存成功',
    saveFailed: '保存失败',
    deleteConfirm: '确定要删除这条记录吗？'
  }
}
```

```ts
// locales/en-US.ts
export default {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete'
  },
  user: {
    name: 'Name',
    email: 'Email',
    status: 'Status',
    namePlaceholder: 'Please enter name',
    emailPlaceholder: 'Please enter email address'
  },
  status: {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending'
  },
  messages: {
    saveSuccess: 'Save successful',
    saveFailed: 'Save failed',
    deleteConfirm: 'Are you sure to delete this record?'
  }
}
```

```ts
// locales/index.ts
import zhCN from './zh-CN'
import enUS from './en-US'

export const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}
```

### 在配置中使用

```ts
import { messages } from './locales'

app.use(createCurdConfig({
  i18n: {
    locale: 'zh-CN',
    fallbackLocale: 'en-US',
    messages
  }
}))
```

## 日期时间国际化

### 日期格式配置

```ts
app.use(createCurdConfig({
  i18n: {
    locale: 'zh-CN',
    dateFormats: {
      'zh-CN': {
        date: 'YYYY年MM月DD日',
        datetime: 'YYYY年MM月DD日 HH:mm:ss',
        time: 'HH:mm:ss'
      },
      'en-US': {
        date: 'MM/DD/YYYY',
        datetime: 'MM/DD/YYYY HH:mm:ss',
        time: 'HH:mm:ss'
      }
    }
  }
}))
```

### 日期控件国际化

```ts
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

const columns = [
  {
    title: () => t('user.birthDate'),
    dataIndex: 'birth_date',
    form: {
      control: 'date',
      locale: computed(() => {
        return locale.value === 'zh-CN' ? 'zh-cn' : 'en'
      }),
      format: computed(() => {
        return locale.value === 'zh-CN' ? 'YYYY年MM月DD日' : 'MM/DD/YYYY'
      })
    }
  }
]
```

## 数字和货币格式化

### 数字格式化

```ts
const formatNumber = (value: number, locale: string) => {
  return new Intl.NumberFormat(locale).format(value)
}

const formatCurrency = (value: number, locale: string) => {
  const currencyMap = {
    'zh-CN': 'CNY',
    'en-US': 'USD'
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyMap[locale] || 'USD'
  }).format(value)
}

// 在列配置中使用
{
  title: () => t('product.price'),
  dataIndex: 'price',
  customRender: ({ value }) => formatCurrency(value, locale.value)
}
```

### 百分比格式化

```ts
const formatPercent = (value: number, locale: string) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2
  }).format(value / 100)
}
```

## 右到左语言支持

### RTL 布局配置

```ts
app.use(createCurdConfig({
  i18n: {
    locale: 'ar-SA', // 阿拉伯语
    rtl: true,       // 启用 RTL 布局
    messages: {
      'ar-SA': {
        // 阿拉伯语翻译
      }
    }
  }
}))
```

### RTL 样式适配

```css
/* 根据语言方向调整样式 */
[dir="rtl"] .std-table {
  text-align: right;
}

[dir="rtl"] .std-form .ant-form-item-label {
  text-align: right;
}

[dir="rtl"] .std-search .ant-form-item {
  margin-left: 0;
  margin-right: 16px;
}
```

## 动态语言切换

### 语言切换组件

```vue
<script setup lang="ts">
import { Select } from 'ant-design-vue'
import { useI18n } from '@uozi-admin/curd'

const { locale, setLocale, availableLocales } = useI18n()

const languageOptions = [
  { label: '简体中文', value: 'zh-CN', flag: '🇨🇳' },
  { label: 'English', value: 'en-US', flag: '🇺🇸' },
  { label: '日本語', value: 'ja-JP', flag: '🇯🇵' },
  { label: 'العربية', value: 'ar-SA', flag: '🇸🇦' }
]

const handleLanguageChange = (value: string) => {
  setLocale(value)
  
  // 保存用户偏好
  localStorage.setItem('preferred-language', value)
  
  // 可选：刷新页面以应用所有更改
  // window.location.reload()
}

// 页面加载时恢复用户偏好
onMounted(() => {
  const savedLanguage = localStorage.getItem('preferred-language')
  if (savedLanguage && availableLocales.includes(savedLanguage)) {
    setLocale(savedLanguage)
  }
})
</script>

<template>
  <Select
    v-model:value="locale"
    @change="handleLanguageChange"
    style="width: 150px;"
  >
    <SelectOption 
      v-for="option in languageOptions" 
      :key="option.value"
      :value="option.value"
    >
      {{ option.flag }} {{ option.label }}
    </SelectOption>
  </Select>
</template>
```

### 语言切换持久化

```ts
// 语言偏好管理
class LanguagePreference {
  private static readonly STORAGE_KEY = 'curd-language'
  
  static save(locale: string) {
    localStorage.setItem(this.STORAGE_KEY, locale)
  }
  
  static load(): string | null {
    return localStorage.getItem(this.STORAGE_KEY)
  }
  
  static clear() {
    localStorage.removeItem(this.STORAGE_KEY)
  }
}

// 在应用初始化时使用
const initializeLanguage = () => {
  const savedLanguage = LanguagePreference.load()
  const browserLanguage = navigator.language
  const defaultLanguage = 'zh-CN'
  
  const targetLanguage = savedLanguage || 
                        (availableLocales.includes(browserLanguage) ? browserLanguage : defaultLanguage)
  
  setLocale(targetLanguage)
}
```

## 复数形式处理

### 复数规则配置

```ts
const pluralRules = {
  'zh-CN': (count: number) => 0, // 中文没有复数形式
  'en-US': (count: number) => count === 1 ? 0 : 1,
  'ru-RU': (count: number) => {
    // 俄语复数规则较复杂
    if (count % 10 === 1 && count % 100 !== 11) return 0
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 1
    return 2
  }
}

const messages = {
  'en-US': {
    'item.count': ['{count} item', '{count} items'],
    'user.count': ['{count} user', '{count} users']
  },
  'ru-RU': {
    'item.count': ['{count} элемент', '{count} элемента', '{count} элементов']
  }
}

// 使用复数翻译
const tPlural = (key: string, count: number) => {
  const rule = pluralRules[locale.value]
  const index = rule ? rule(count) : 0
  const templates = messages[locale.value][key]
  
  if (Array.isArray(templates)) {
    return templates[index]?.replace('{count}', count.toString()) || templates[0]
  }
  
  return templates?.replace('{count}', count.toString()) || key
}
```

## 相关内容

- [自定义扩展](./customization) - 自定义渲染和控件
- [表单交互](./form-interactions) - 表单联动和验证
- [批量操作](./batch-operations) - 批量编辑和删除