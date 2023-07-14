import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'
import { BugOutlined } from '@vicons/antd'
const bugFixRoutes: RouteRecordRaw = {
  name: 'BugFix',
  path: '/bugFix',
  redirect: '/bugFix/tableSync',
  component: Layout,
  meta: {
    title: 'NaiveUI Bug Fix',
    icon: BugOutlined,
    sort: 4
  },
  children: [
    {
      name: 'TableSync',
      path: 'tableSync',
      component: () => import('@/views/BugFix/TableSync/index.vue'),
      meta: {
        title: 'Table not Sync'
      }
    }
  ]
}

export default bugFixRoutes
