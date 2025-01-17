// import { Curd } from '@uozi-admin/request'
//
// export const userApi = new Curd('http://localhost:4523/m1/3871056-3505026-default/users')

import { extendCurdApi, useCurdApi } from '@uozi-admin/request/src/useCurdApi.js'

export const userApi = useCurdApi<{ aa: string }>('/aass')

extendCurdApi(userApi, {
  getList: async () => {
    console.log('getList')
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
