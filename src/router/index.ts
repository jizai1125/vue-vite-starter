import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'
import moduleRoutes from './modules'
import { MenuOutlined as MenuIcon } from '@vicons/antd'
// 权限路由表，后续会根据用户权限动态添加到 vue router
export const asyncRoutes: RouteRecordRaw[] = [
  {
    name: 'Layout',
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        name: 'Dashbord',
        path: '/dashboard',
        meta: {
          title: 'Dashboard',
          icon: MenuIcon
        },
        component: () => import('@/views/Dashboard/index.vue')
      }
    ]
  },
  ...moduleRoutes
]

// 无需权限的路由表
export const constantRoutes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/TheLogin.vue'),
    meta: { title: '登录', hidden: true }
  },

  {
    name: 'NotFound',
    path: '/:path*',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'not found', hidden: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
