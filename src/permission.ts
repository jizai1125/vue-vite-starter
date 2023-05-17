import router from '@/router'
import { getToken } from '@/utils/auth'
import useUserStore from '@/store/user'
import { isNavigationFailure } from 'vue-router'

// 路由白名单
const whiteList = ['/login']

router.beforeEach(async (to, from) => {
  console.log('[beforeEach from]', from.fullPath)
  console.log('[beforeEach to]', to.fullPath)
  const userStore = useUserStore()
  const hasToken = getToken()
  console.info('[hasToken]', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      return from.fullPath
    } else {
      // TODO 获取用户信息
      await userStore.getUserInfo()
      const hasRoutes = userStore.routes && userStore.routes.length > 0
      console.info('[hasRoutes]', hasRoutes)
      if (!hasRoutes) {
        const accessRoutes = userStore.generateAccessRoutes()
        console.log(accessRoutes)
        const toBeRemoveRouteCbs = new Set<() => void>()
        accessRoutes.forEach((route) => {
          const cb = router.addRoute(route)
          toBeRemoveRouteCbs.add(cb)
        })
        userStore.toBeRemoveRouteCbs = [...toBeRemoveRouteCbs]
        return to.fullPath
      }
    }
  } else {
    if (!whiteList.includes(to.path)) {
      return { path: '/login', query: { redirect: to.fullPath } }
    }
  }
})

const title = import.meta.env.VITE_TITLE
router.afterEach((to, from, failure) => {
  if (!isNavigationFailure(failure)) {
    document.title = [to.meta.title, title].join(' · ')
  }
})
