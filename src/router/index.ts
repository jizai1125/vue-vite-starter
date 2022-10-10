import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    meta: {
      title: '首页',
      hideNavBarLeftArrow: true
    },
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/search',
    name: 'TheSearch',
    meta: {
      title: '搜索',
      hideNavBarLeftArrow: true
    },
    component: () => import('@/views/TheSearch.vue')
  },
  {
    path: '/list',
    name: 'TheList',
    meta: {
      title: '列表',
      hideNavBarLeftArrow: true
    },
    component: () => import('@/views/TheList.vue')
  },
  {
    path: '/my',
    name: 'TheMy',
    meta: {
      title: '我的',
      hideNavBarLeftArrow: true
    },
    component: () => import('@/views/TheMy/index.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
