import type { SidebarItem } from '../props'
import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import SidebarContent from '../components/SidebarContent.vue'

const Empty = { render: () => null }

const items: SidebarItem[] = [
  { name: 'dashboard', path: '/dashboard', title: '仪表盘' },
  {
    name: 'system',
    path: '/system',
    title: '系统',
    children: [
      { name: 'users', path: 'users', title: '用户' },
    ],
  },
]

async function mountAt(path: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/dashboard', name: 'dashboard', component: Empty },
      {
        path: '/system',
        component: Empty,
        children: [{ path: 'users', name: 'users', component: Empty }],
      },
    ],
  })
  await router.push(path)
  await router.isReady()

  return render(SidebarContent, {
    props: { items },
    global: { plugins: [router] },
  })
}

describe('sidebarContent 组件', () => {
  it('初始化时计算展开项不应抛出 TDZ 错误', async () => {
    const { findByText } = await mountAt('/system/users/')

    expect(await findByText('系统')).toBeTruthy()
  })

  it('顶层路由也能正常渲染', async () => {
    const { findByText } = await mountAt('/dashboard')

    expect(await findByText('仪表盘')).toBeTruthy()
  })
})
