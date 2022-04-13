import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import { asyncRoutes } from '@/router'

interface IUser {
  userInfo?: object
  routes: RouteRecordRaw[]
  authRoutes: string[]
}

const userStore = defineStore('user', {
  state: (): IUser => {
    return {
      userInfo: undefined,
      // 所有路由表
      routes: [],
      // 用户具有的权限路由资源
      authRoutes: []
    }
  },
  actions: {
    getUserInfo(userId: number) {
      return new Promise((resolve, reject) => {
        // getUserInfoApi(userId)
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
  const res = routes
  return res
}

export default userStore
