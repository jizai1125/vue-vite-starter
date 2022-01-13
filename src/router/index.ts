import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('views/HelloWorld.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
