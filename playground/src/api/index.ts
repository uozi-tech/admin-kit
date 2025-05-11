import type { CurdApi } from '@uozi-admin/request'
import { useAxios, useCurdApi } from '@uozi-admin/request'

const { setRequestInterceptor, setResponseInterceptor } = useAxios()

export function serviceInterceptor() {
  setRequestInterceptor((config) => {
    // const user = useUserStore()

    // const { token } = storeToRefs(user)
    // if (token)
    //   config.headers.Token = token.value

    return config
  })

  setResponseInterceptor(
    (response) => {
      // get refresh-token from headers
    //   response.headers['refresh-token'] && useUserStore().setToken(response.headers['refresh-token'])

      return Promise.resolve(response.data)
    },
    async () => {
    //   const permission = usePermissionStore()
    //   const user = useUserStore()
    //   const router = useRouter()

    //   switch (error.response.status) {
    //     case 401:
    //     case 403:
      //   user.reset()
      //   permission.reset()
      //   await router.push(PATH_LOGIN)
    //       break
    //   }
    //   return Promise.reject(error.response.data)
    },
  )
}

serviceInterceptor()

// 用户接口
export const userApi: CurdApi = useCurdApi('/users')

// 产品接口
export const productApi: CurdApi = useCurdApi('/products')

// 分类接口
export const categoryApi: CurdApi = useCurdApi('/categories')

// 订单接口
export const orderApi: CurdApi = useCurdApi('/orders')

// 文章接口
export const postApi: CurdApi = useCurdApi('/posts')

// 评论接口
export const commentApi: CurdApi = useCurdApi('/comments')

// 标签接口
export const tagApi: CurdApi = useCurdApi('/tags')

// 设置接口
export const settingsApi: CurdApi = useCurdApi('/settings')
