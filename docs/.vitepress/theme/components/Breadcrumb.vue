<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()

interface BreadcrumbItem {
  text: string
  link?: string
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = page.value.relativePath

  // 如果不是 CURD 文档，不显示面包屑
  if (!path.startsWith('zh/curd/')) {
    return []
  }

  const segments = path.replace('zh/curd/', '').replace('.md', '').split('/')
  const items: BreadcrumbItem[] = [
    { text: 'CURD', link: '/zh/curd/' },
  ]

  let currentPath = '/zh/curd'

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]

    if (!segment)
      continue

    currentPath += `/${segment}`

    // 根据路径段生成面包屑文本
    let text = ''
    switch (segment) {
      case 'fundamentals':
        text = '基础知识'
        break
      case 'concepts':
        text = '核心概念'
        break
      case 'configuration':
        text = '配置指南'
        break
      case 'examples':
        text = '使用示例'
        break
      case 'components':
        text = '组件参考'
        break
      case 'std-curd':
        text = 'StdCurd'
        break
      case 'std-table':
        text = 'StdTable'
        break
      case 'std-form':
        text = 'StdForm'
        break
      case 'std-search':
        text = 'StdSearch'
        break
      case 'form-controls':
        text = '表单控件'
        break
      case 'basic-controls':
        text = '基础控件'
        break
      case 'selection-controls':
        text = '选择控件'
        break
      case 'date-controls':
        text = '日期控件'
        break
      case 'advanced-controls':
        text = '高级控件'
        break
      case 'advanced':
        text = '高级特性'
        break
      case 'customization':
        text = '自定义扩展'
        break
      case 'form-interactions':
        text = '表单交互'
        break
      case 'batch-operations':
        text = '批量操作'
        break
      case 'internationalization':
        text = '国际化'
        break
      case 'api-reference':
        text = 'API 参考'
        break
      case 'getting-started':
        text = '快速开始'
        break
      default:
        // 将 kebab-case 转换为标题格式
        text = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
    }

    // 最后一个项目不需要链接
    if (i === segments.length - 1) {
      items.push({ text })
    }
    else {
      items.push({ text, link: currentPath })
    }
  }

  return items
})
</script>

<template>
  <nav
    v-if="breadcrumbs.length > 1"
    class="breadcrumb"
  >
    <span
      v-for="(item, index) in breadcrumbs"
      :key="index"
      class="breadcrumb-item"
    >
      <a
        v-if="item.link && index < breadcrumbs.length - 1"
        :href="item.link"
        class="breadcrumb-link"
      >
        {{ item.text }}
      </a>
      <span v-else>{{ item.text }}</span>
    </span>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  flex-wrap: wrap;
  gap: 4px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin: 0 8px;
  color: var(--vp-c-divider);
}

.breadcrumb-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--vp-c-brand-2);
}

@media (max-width: 640px) {
  .breadcrumb {
    font-size: 13px;
    margin-bottom: 16px;
  }

  .breadcrumb-item:not(:last-child)::after {
    margin: 0 6px;
  }
}
</style>
