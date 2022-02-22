import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Layout',
    path: '/',
    redirect: '/HomeIndex',
    component: Layout,
    children: [
      {
        name: 'HomeIndex',
        path: 'homeIndex',
        component: () => import('views/HomeIndex/index.vue'),
        meta: { title: '首页' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
