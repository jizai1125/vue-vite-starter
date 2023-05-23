import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'
import moduleRoutes from './modules'
import { DashboardOutlined as DashbordIcon } from '@vicons/antd'
// 动态路由表，涉及权限，后续会根据用户具有的权限来过滤后动态添加到 vue-router 中
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
          title: '总览',
          icon: DashbordIcon
        },
        component: () => import('@/views/Dashboard/index.vue')
      }
    ]
  },
  ...moduleRoutes
]

// 默认路由表，权限无关的路由
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
