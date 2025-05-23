// import { Curd } from '@uozi-admin/request'
//
// export const userApi = new Curd('http://localhost:4523/m1/3871056-3505026-default/users')

import { extendCurdApi, useCurdApi } from '@uozi-admin/request/src/useCurdApi.js'

export const userApi = useCurdApi<{ aa: string }>('/aass', {
  getLis2t: async () => {
    // eslint-disable-next-line no-console
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

const userApi2 = extendCurdApi(userApi, {
  getLis2t: async () => {
    // eslint-disable-next-line no-console
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

userApi2.getLis2t()
userApi.getLis2t()
