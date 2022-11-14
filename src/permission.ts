import router from '@/router'
import { getToken } from '@/utils/auth'
import useUserStore from '@/store/user'

// 无需权限的路由
const whiteList = ['/login']

router.beforeEach(async (to, from) => {
  console.log('from >>>', from.fullPath)
  console.log('to >>>', to.fullPath)
  const userStore = useUserStore()
  const hasToken = getToken()
  console.info('判断是否有 token', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      return from.fullPath
    } else {
      // TODO 获取用户信息
      await userStore.getUserInfo()
      const hasRoutes = userStore.routes && userStore.routes.length > 0
      console.info('判断是否生成路由表', hasRoutes)
      if (!hasRoutes) {
        const accessRoutes = userStore.generateRoutes()
        console.log(accessRoutes)
        accessRoutes.forEach((route) => {
          const removeCb = router.addRoute(route)
          userStore.addRemoveRouteCb(removeCb)
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
