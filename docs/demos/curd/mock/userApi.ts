import type { CurdApi } from '@uozi-admin/curd/dist/types/api'

// 模拟的初始数据
const mockData = [
  {
    id: 1,
    name: 'admin',
    email: 'admin@uozi.com',
    phone: '123456789',
    status: 1, // 1: Active, -1: Banned
    created_at: 1769856000000,
    updated_at: 1769856000000,
    deleted_at: 0,
  },
  {
    id: 2,
    name: 'user',
    email: 'user@uozi.com',
    phone: '987654321',
    status: -1,
    created_at: 1769856000000,
    updated_at: 1769856000000,
    deleted_at: 0,
  },
]

// 全局延时配置（单位：毫秒）
const API_DELAY = 500

// 模拟延时的函数
function simulateDelay(result) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), API_DELAY)
  })
}

// 筛选、分页、排序的函数（保持不变）
function filterAndPaginate(data, query) {
  const {
    name,
    email,
    phone,
    status,
    created_start,
    created_end,
    page = 1,
    per_page = 10,
    sort_by = 'created_at',
    sort_order = 'desc',
  } = query

  const filteredData = data.filter((item) => {
    if (name && !item.name.includes(name))
      return false
    if (email && !item.email.includes(email))
      return false
    if (phone && !item.phone.includes(phone))
      return false
    if (status && item.status !== Number.parseInt(status))
      return false
    if (created_start && new Date(item.created_at) < new Date(created_start))
      return false
    if (created_end && new Date(item.created_at) > new Date(created_end))
      return false
    return true
  })

  // 排序逻辑
  filteredData.sort((a, b) => {
    const order = sort_order === 'asc' ? 1 : -1
    if (a[sort_by] < b[sort_by])
      return -1 * order
    if (a[sort_by] > b[sort_by])
      return 1 * order
    return 0
  })

  // 分页逻辑
  const total = filteredData.length
  const total_pages = Math.ceil(total / per_page)
  const start = (page - 1) * per_page
  const paginatedData = filteredData.slice(start, start + per_page)

  return { data: paginatedData, pagination: { total, per_page, current_page: Number.parseInt(page), total_pages } }
}

// 获取用户列表 API
export function getUsers(query = {}) {
  const result = filterAndPaginate(mockData, query)
  return simulateDelay(result)
}

// 获取用户详情 API
export function getUserDetail(id) {
  const user = mockData.find(item => item.id === Number.parseInt(id))
  if (!user)
    return simulateDelay({ message: 'User not found', error: true })
  return simulateDelay(user)
}

// 新增用户 API
export function createUser(newUser) {
  const id = mockData.length ? mockData[mockData.length - 1].id + 1 : 1
  const createdUser = {
    id,
    ...newUser,
    created_at: 1769856000000,
    updated_at: 1769856000000,
    deleted_at: null,
  }
  mockData.push(createdUser)
  return simulateDelay(createdUser)
}

// 更新用户 API
export function updateUser(id, updatedData) {
  const user = mockData.find(item => item.id === Number.parseInt(id) && !item.deleted_at)
  if (!user)
    return simulateDelay({ message: 'User not found', error: true })

  Object.assign(user, updatedData, { updated_at: 1769856000000 })
  return simulateDelay(user)
}

// 删除用户 API（软删除和永久删除合并为一个 API）
export function deleteUser(id, permanently = false) {
  const userIndex = mockData.findIndex(item => item.id === Number.parseInt(id))
  if (userIndex === -1)
    return simulateDelay({ message: 'User not found', error: true })

  if (permanently) {
    mockData.splice(userIndex, 1)
    return simulateDelay({ message: 'User permanently deleted' })
  }
  else {
    const user = mockData[userIndex]
    user.deleted_at = 1769856000000
    return simulateDelay({ message: 'User soft deleted' })
  }
}

// 恢复回收站数据 API
export function restoreUser(id) {
  const user = mockData.find(item => item.id === Number.parseInt(id) && item.deleted_at)
  if (!user)
    return simulateDelay({ message: 'User not found or not in trash', error: true })

  user.deleted_at = 0
  user.updated_at = 1769856000000
  return simulateDelay(user)
}

export const userApi = {
  getList: getUsers,
  getItem: getUserDetail,
  createItem: createUser,
  updateItem: updateUser,
  deleteItem: deleteUser,
  restoreItem: restoreUser,
} as CurdApi
