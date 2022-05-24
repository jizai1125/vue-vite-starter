import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import { asyncRoutes } from '@/router'
import { setToken, removeToken } from '@/utils/auth'
interface IUser {
  userId?: number
  userInfo?: object
  // 所有路由表
  routes: RouteRecordRaw[]
  // 用户具有的权限路由资源, 后端返回
  authRoutes: string[]
  // 动态添加路由 addRoute 方法返回的回调，供后续删除使用
  routeRemoveCallback: Array<() => void>
}

const userStore = defineStore('user', {
  state: (): IUser => {
    return {
      userId: undefined,
      userInfo: undefined,
      routes: [],
      authRoutes: [],
      routeRemoveCallback: []
    }
  },
  actions: {
    login(userInfo: object) {
      return new Promise<any>((resolve, reject) => {
        console.warn('TODO login api')
        // loginApi(userInfo).then(res => {
        //   resolve(res)
        // }).catch(err => {
        //   reject(err)
        // })
        // mock data
        const resData = {
          token: 'token_xxx',
          userId: 1
        }
        this.userId = resData.userId
        setToken(resData.token)
        resolve(resData)
      })
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        console.warn('TODO getUserInfo api')
        // getUserInfoApi(this.userId)
        //   .then((data) => {
        //     resolve(data)
        //   })
        //   .catch((err) => {
        //     reject(err)
        //   })
        // mock data
        const resData = {
          name: 'jizai',
          role: 'admin',
          authRoutes: ['/dashboard', '/nested']
        }
        this.userInfo = resData
        this.authRoutes = resData.authRoutes
        resolve(resData)
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        console.warn('logout api')
        removeToken()
        this.resetState()
        this.resetRouter()
        resolve(null)
      })
    },
    resetState() {
      this.userId = undefined
      this.userInfo = undefined
      this.routes = []
      this.authRoutes = []
    },
    addRouteRemoveCallback(cb: () => void) {
      this.routeRemoveCallback.push(cb)
    },
    resetRouter() {
      this.routeRemoveCallback.forEach((cb) => cb())
      this.routeRemoveCallback = []
    },
    generateRoutes() {
      const accessRoutes = filterAsyncRoutes(this.authRoutes, asyncRoutes)
      this.routes = constantRoutes.concat(accessRoutes)
      return accessRoutes
    }
  }
})

/**
 * 递归过滤异步路由表，返回用户可访问的权限路由表
 * @param authRoutes 权限路由资源 ['/a', ...]
 * @param routes 异步路由表
 * @returns
 */
function filterAsyncRoutes(authRoutes: string[], routes: RouteRecordRaw[]) {
  // TODO 过滤
  console.warn('TODO 过滤 authRoutes', authRoutes, routes)
  const res = routes
  return res
}

export default userStore
