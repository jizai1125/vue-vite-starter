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
  return routes
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
 * 检查重定向的路由存不存在，不存在则重设 redirect 或隐藏菜单
 * 解决显示了父级菜单，但它重定向的子路由不存在导致导航到 404 页面的情况
 * 例如：父级路由 /parent 显示为菜单，重定向到 /parent/child，但它的子路由 child 可能会因无权限被过滤掉，此时父级菜单应隐藏
 * @param routes
 * @param parentPath
 */
function traverseRoutesRedirect(routes: RouteRecordRaw[], parentPath?: string): RouteRecordRaw[] {
  routes.forEach((route) => {
    if (route.children) {
      const fullPath = resolveRoutePath(route, parentPath)
      const isExit = isRedirectExit(route.redirect as string, route.children, fullPath)
      // console.warn('[traverseRoutesRedirect]', route.meta?.title, isExit)
      if (route.redirect && !isExit) {
        const subRoute = route.children.find((item) => !item.meta?.hidden)
        // console.warn('[traverseRoutesRedirect]', '重设 redirect', route.redirect, route, subRoute)
        if (subRoute) {
          const redirect = resolveRoutePath(subRoute, fullPath)
          route.redirect = redirect
        } else if (!route.meta?.hidden) {
          // 重定向路由不存在，隐藏当前菜单
          route.redirect = undefined
          if (!route.meta) route.meta = {}
          route.meta.hidden = true
        }
      }
      traverseRoutesRedirect(route.children, fullPath)
    }
  })
  return routes
}

function resolveRoutePath(route: RouteRecordRaw, parentPath?: string): string {
  const fullPath = route.path.startsWith('/')
    ? route.path
    : parentPath
    ? `${parentPath}/${route.path}`
    : route.path
  return fullPath
}

function isRedirectExit(redirect: string, routes: RouteRecordRaw[], parentPath: string) {
  let flag = false
  routes.forEach((route) => {
    const fullPath = route.path.startsWith('/')
      ? route.path
      : parentPath
      ? `${parentPath}/${route.path}`
      : route.path
    if (redirect === fullPath) {
      flag = true
    } else if (!flag && route.children) {
      flag = isRedirectExit(redirect, route.children, fullPath)
    }
  })
  return flag
}

export default userStore
