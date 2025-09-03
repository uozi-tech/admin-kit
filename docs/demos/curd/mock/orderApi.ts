import type { CurdApi } from '@uozi-admin/curd/dist/types/api'

// Mock order data
const mockOrders = [
  {
    id: 1,
    order_no: 'ORD20241201001',
    customer: {
      name: '张三',
      phone: '13800138000',
    },
    total_amount: 7999.00,
    status: 'paid',
    payment_method: 'alipay',
    remark: '请尽快发货',
    created_at: '2024-12-01T10:30:00Z',
  },
  {
    id: 2,
    order_no: 'ORD20241201002',
    customer: {
      name: '李四',
      phone: '13800138001',
    },
    total_amount: 199.00,
    status: 'pending',
    payment_method: 'wechat',
    remark: '',
    created_at: '2024-12-01T11:15:00Z',
  },
  {
    id: 3,
    order_no: 'ORD20241130001',
    customer: {
      name: '王五',
      phone: '13800138002',
    },
    total_amount: 12999.00,
    status: 'delivered',
    payment_method: 'bank',
    remark: '送货上门',
    created_at: '2024-11-30T14:20:00Z',
  },
]

export const orderApi = {
  getList: async (params: any = {}): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))

    let filteredOrders = [...mockOrders]

    if (params.order_no) {
      filteredOrders = filteredOrders.filter(order =>
        order.order_no.toLowerCase().includes(params.order_no.toLowerCase()),
      )
    }

    if (params.customer) {
      filteredOrders = filteredOrders.filter(order =>
        order.customer.name.includes(params.customer)
        || order.customer.phone.includes(params.customer),
      )
    }

    if (params.status) {
      filteredOrders = filteredOrders.filter(order => order.status === params.status)
    }

    const current = params.current || 1
    const pageSize = params.pageSize || 10
    const start = (current - 1) * pageSize
    const end = start + pageSize

    return {
      data: filteredOrders.slice(start, end),
      pagination: {
        total: filteredOrders.length,
        current,
        pageSize,
      },
    }
  },

  createItem: async (data: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newOrder = {
      id: Math.max(...mockOrders.map(o => o.id)) + 1,
      order_no: `ORD${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${String(Math.max(...mockOrders.map(o => o.id)) + 1).padStart(3, '0')}`,
      ...data,
      created_at: new Date().toISOString(),
    }
    mockOrders.push(newOrder)
    return newOrder
  },

  updateItem: async (id: number, data: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockOrders.findIndex(order => order.id === id)
    if (index !== -1) {
      mockOrders[index] = { ...mockOrders[index], ...data }
      return mockOrders[index]
    }
    throw new Error('Order not found')
  },

  deleteItem: async (id: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockOrders.findIndex(order => order.id === id)
    if (index !== -1) {
      mockOrders.splice(index, 1)
      return { success: true }
    }
    throw new Error('Order not found')
  },

  getItem: async (id: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const order = mockOrders.find(order => order.id === id)
    if (order) {
      return order
    }
    throw new Error('Order not found')
  },
} as CurdApi
