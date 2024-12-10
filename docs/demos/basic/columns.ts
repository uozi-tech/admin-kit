import type { StdTableColumn } from '@uozi-admin/curd'
import { datetimeRender, maskRender } from '@uozi-admin/curd'

enum UserStatus {
  Active = 1,
  Ban = -1,
}

const UserStatusMask = {
  [UserStatus.Active]: 'Active',
  [UserStatus.Ban]: 'Ban',
}

export const userColumns: StdTableColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true,
      },
    },
  },
  {
    title: '密码',
    dataIndex: 'password',
    edit: {
      type: 'password',
      password: {
        generate: true,
      },
    },
    hiddenInDetail: true,
    hiddenInTable: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true,
      },
    },
  },
  {
    title: '手机',
    dataIndex: 'phone',
    search: true,
    edit: {
      type: 'input',
      formItem: {
        required: true,
      },
    },
  },
  {
    title: '用户状态',
    dataIndex: 'status',
    search: true,
    edit: {
      type: 'select',
      select: {
        mask: UserStatusMask,
      },
      formItem: {
        required: true,
      },
    },
    customRender: maskRender(UserStatusMask),
  },
  {
    title: '最后活跃',
    dataIndex: 'last_active',
    search: false,
    customRender: datetimeRender,
    hiddenInEdit: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    search: {
      type: 'dateRange',
    },
    customRender: datetimeRender,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    search: {
      type: 'dateRange',
    },
    customRender: datetimeRender,
  },
  {
    title: '操作',
    dataIndex: 'actions',
  },
]
