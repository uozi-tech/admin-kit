import type { CurdApi } from '@uozi-admin/curd/dist/types/api'

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    images: ['https://picsum.photos/200/200?random=1'],
    category: { name: '手机', value: 'phone' },
    price: 7999.00,
    stock: 50,
    description: '最新款iPhone，配备A17 Pro芯片',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'MacBook Pro',
    images: ['https://picsum.photos/200/200?random=2'],
    category: { name: '电脑', value: 'computer' },
    price: 12999.00,
    stock: 25,
    description: '专业级笔记本电脑',
    is_active: true,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 3,
    name: '休闲T恤',
    images: ['https://picsum.photos/200/200?random=3'],
    category: { name: '男装', value: 'men' },
    price: 199.00,
    stock: 0,
    description: '舒适的纯棉T恤',
    is_active: false,
    created_at: '2024-02-01T00:00:00Z',
  },
]

export const productApi = {
  getList: async (params: any = {}): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filteredProducts = [...mockProducts]

    if (params.name) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(params.name.toLowerCase()),
      )
    }

    if (params.is_active !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.is_active === params.is_active)
    }

    const current = params.current || 1
    const pageSize = params.pageSize || 10
    const start = (current - 1) * pageSize
    const end = start + pageSize

    return {
      data: filteredProducts.slice(start, end),
      pagination: {
        total: filteredProducts.length,
        current,
        pageSize,
      },
    }
  },

  createItem: async (data: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newProduct = {
      id: Math.max(...mockProducts.map(p => p.id)) + 1,
      ...data,
      created_at: new Date().toISOString(),
    }
    mockProducts.push(newProduct)
    return newProduct
  },

  updateItem: async (id: number, data: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockProducts.findIndex(product => product.id === id)
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...data }
      return mockProducts[index]
    }
    throw new Error('Product not found')
  },

  deleteItem: async (id: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockProducts.findIndex(product => product.id === id)
    if (index !== -1) {
      mockProducts.splice(index, 1)
      return { success: true }
    }
    throw new Error('Product not found')
  },

  getItem: async (id: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const product = mockProducts.find(product => product.id === id)
    if (product) {
      return product
    }
    throw new Error('Product not found')
  },
} as CurdApi
