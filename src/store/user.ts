import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import { asyncRoutes } from '@/router'
import { setToken, removeToken } from '@/utils/auth'
import { shallowReactive } from 'vue'
interface IUser {
  userId?: number
  userInfo?: object
  // 所有路由表
  routes: RouteRecordRaw[]
  // 用户具有的权限路由 path 资源, 后端返回
  authRoutePaths: string[]
  // 动态添加路由 addRoute 方法返回的回调，供后续删除使用
  toBeRemoveRouteCbs: Array<() => void>
}

const userStore = defineStore('user', {
  state: (): IUser => {
    return shallowReactive({
      userId: undefined,
      userInfo: undefined,
      routes: [],
      authRoutePaths: [],
      toBeRemoveRouteCbs: []
    })
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
          paths: ['/dashboard', '/nested']
        }
        this.userInfo = resData
        this.authRoutePaths = resData.paths
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
      this.authRoutePaths = []
    },
    resetRouter() {
      this.toBeRemoveRouteCbs.forEach((cb) => cb())
      this.toBeRemoveRouteCbs = []
    },
    generateAccessRoutes() {
      const accessRoutes = generateAsyncRoutes(this.authRoutePaths, asyncRoutes)
      this.routes = constantRoutes.concat(accessRoutes)
      return accessRoutes
    }
  }
})

/**
 * 处理动态路由表，返回过滤的权限路由表配置
 * @param authPaths 权限路由 path 资源 ['/a', ...]
 * @param routes 动态路由表配置
 * @returns
 */
function generateAsyncRoutes(authPaths: string[], routes: RouteRecordRaw[]) {
  // for debug
  const accessRoutes = filterRoutesByPath(authPaths, routes)
  console.warn('[generateAsyncRoutes]', accessRoutes)
  traverseRoutesRedirect(accessRoutes)
  // 菜单排序
  accessRoutes.sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))
  return accessRoutes
}

/**
 * 过滤路由表配置
 * @param authPaths 路由 path 数组
 * @param routes 路由表配置
 * @param parentPath 父级路由 path
 * @returns accessRoutes
 */
function filterRoutesByPath(authPaths: string[], routes: RouteRecordRaw[], parentPath?: string) {
  const accessRoutes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tmpPath = route.path.startsWith('/')
      ? route.path
      : parentPath
      ? `${parentPath}/${route.path}`
      : route.path
    if (authPaths.includes(tmpPath)) {
      accessRoutes.push(route)
    }
    if (route.children) {
      const children = filterRoutesByPath(authPaths, route.children, tmpPath)
      if (children.length) {
        route.children = children
        accessRoutes.push(route)
      }
    }
  })
  return accessRoutes
}

/**
 * 设置各个根路由模块重定向
 * @param routes
 * @returns
 */
function traverseRoutesRedirect(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  routes.forEach((route) => {
    if (route.children) {
      const redirect = getRedirectPath(route.children, route.path)
      route.redirect = redirect
    }
  })
  return routes
}

/**
 * 获取根路径重定向路由 path
 * @param routes
 * @param parentPath
 * @returns
 */
function getRedirectPath(routes: RouteRecordRaw[], parentPath?: string): string | undefined {
  if (!routes.length) return
  const route = routes[0]
  let fullPath = route.path.startsWith('/')
    ? route.path
    : parentPath
    ? `${parentPath}/${route.path}`
    : route.path
  if (route.children) {
    const tmpPath = getRedirectPath(route.children, fullPath)
    if (tmpPath) fullPath = tmpPath
  }
  return fullPath
}

export default userStore
