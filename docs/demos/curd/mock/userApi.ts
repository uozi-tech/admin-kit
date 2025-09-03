import type { CurdApi } from '@uozi-admin/curd/dist/types/api'

// Mock user data
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    status: 1,
    roles: ['admin'],
    created_at: '2024-01-01T00:00:00Z',
    last_active: '2024-12-01T10:30:00Z',
  },
  {
    id: 2,
    username: 'editor',
    email: 'editor@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=editor',
    status: 1,
    roles: ['editor'],
    created_at: '2024-01-15T00:00:00Z',
    last_active: '2024-12-01T09:15:00Z',
  },
  {
    id: 3,
    username: 'viewer',
    email: 'viewer@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viewer',
    status: 0,
    roles: ['viewer'],
    created_at: '2024-02-01T00:00:00Z',
    last_active: '2024-11-30T16:45:00Z',
  },
]

// Create mock API with simulated responses
export const userApi = {
  getList: async (params: any = {}): Promise<any> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    let filteredUsers = [...mockUsers]

    // Apply search filters
    if (params.username) {
      filteredUsers = filteredUsers.filter(user =>
        user.username.toLowerCase().includes(params.username.toLowerCase()),
      )
    }

    if (params.status !== undefined) {
      filteredUsers = filteredUsers.filter(user => user.status === params.status)
    }

    // Pagination
    const current = params.current || 1
    const pageSize = params.pageSize || 10
    const start = (current - 1) * pageSize
    const end = start + pageSize

    return {
      data: filteredUsers.slice(start, end),
      pagination: {
        total: filteredUsers.length,
        current,
        pageSize,
      },
    }
  },

  createItem: async (data: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      ...data,
      created_at: new Date().toISOString(),
      last_active: new Date().toISOString(),
    }
    mockUsers.push(newUser)
    return newUser
  },

  updateItem: async (id: number, data: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockUsers.findIndex(user => user.id === id)
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...data }
      return mockUsers[index]
    }
    throw new Error('User not found')
  },

  deleteItem: async (id: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockUsers.findIndex(user => user.id === id)
    if (index !== -1) {
      mockUsers.splice(index, 1)
      return { success: true }
    }
    throw new Error('User not found')
  },

  getItem: async (id: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const user = mockUsers.find(user => user.id === id)
    if (user) {
      return user
    }
    throw new Error('User not found')
  },
} as CurdApi
