// import { Curd } from '@uozi-admin/request'
//
// export const userApi = new Curd('http://localhost:4523/m1/3871056-3505026-default/users')

import { extendCurdApi, useCurdApi } from '@uozi-admin/request/src/useCurdApi.js'

interface UserApiExtra {
  getCustomList: () => Promise<{
    data: { aa: string }[]
    pagination: {
      total: number
      page: number
      pageSize: number
    }
  }>
}

export const userApi = useCurdApi<{ aa: string }, any, UserApiExtra>('/aass', {
  getCustomList: async () => {
    // eslint-disable-next-line no-console
    console.log('getCustomList')
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        pageSize: 10,
      },
    }
  },
})

const userApi2 = extendCurdApi(userApi, {
  getArchivedList: async () => {
    // eslint-disable-next-line no-console
    console.log('getArchivedList')
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        pageSize: 10,
      },
    }
  },
})

userApi2.getArchivedList()
userApi.getCustomList()
