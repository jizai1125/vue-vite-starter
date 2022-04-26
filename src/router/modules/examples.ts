import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'
import { DribbbleOutlined as ExamplesIcon } from '@vicons/antd'

const examplesRoute: RouteRecordRaw = {
  name: 'Examples',
  path: '/examples',
  redirect: '/examples/example1',
  meta: {
    title: 'examples',
    icon: ExamplesIcon,
    sort: 99
  },
  component: Layout,
  children: [
    {
      name: 'Table',
      path: 'example1',
      meta: {
        title: 'table 示例'
      },
      component: () => import('@/views/Examples/MonitorTable.vue')
    }
  ]
}
export default examplesRoute
