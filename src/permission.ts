import router from '@/router'
import { getToken } from '@/utils/auth'
import useUserStore from '@/store/user'
// 不需要权限的路由
const whiteList = ['/login']

router.beforeEach((to, from) => {
  console.log('from >>>', from.fullPath)
  console.log('to >>>', to.fullPath)
  const userStore = useUserStore()
  const hasToken = getToken()
  console.warn('判断是否有 token', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      return from.fullPath
    } else {
      const hasRoutes = userStore.routes && userStore.routes.length > 0
      console.warn('判断是否生成路由表', hasRoutes)
      if (!hasRoutes) {
        const accessRoutes = userStore.generateRoutes()
        console.log(accessRoutes)
        accessRoutes.forEach((route) => {
          router.addRoute(route)
        })
        return to.fullPath
      }
    }
  } else {
    if (!whiteList.includes(to.path)) {
      return { path: '/login', query: { redirect: to.fullPath } }
    }
  }
})
