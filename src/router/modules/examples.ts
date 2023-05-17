import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'
import { DribbbleOutlined as ExamplesIcon } from '@vicons/antd'

const examplesRoute: RouteRecordRaw = {
  name: 'Examples',
  path: '/examples',
  redirect: '/examples/table',
  meta: {
    title: '示例',
    icon: ExamplesIcon,
    sort: 99
  },
  component: Layout,
  children: [
    {
      name: 'Table',
      path: 'table',
      meta: {
        title: 'Table 示例'
      },
      component: () => import('@/views/Examples/Table/index.vue')
    },
    {
      name: 'Upload',
      path: 'upload',
      meta: {
        title: 'Upload 示例'
      },
      component: () => import('@/views/Examples/Upload/index.vue')
    }
  ]
}
export default examplesRoute
