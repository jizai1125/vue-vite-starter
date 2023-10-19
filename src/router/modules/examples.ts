import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'
import { DribbbleOutlined as ExamplesIcon } from '@vicons/antd'
import EmptyView from '@/layouts/EmptyView.vue'

const examplesRoute: RouteRecordRaw = {
  name: 'Examples',
  path: '/examples',
  redirect: '/examples/table',
  meta: {
    title: '示例',
    icon: ExamplesIcon,
    order: 3
  },
  component: Layout,
  children: [
    {
      name: 'TheTable',
      path: 'table',
      meta: {
        title: 'Table 示例'
      },
      component: () => import('@/views/Examples/TheTable/index.vue')
    },
    {
      name: 'TheUpload',
      path: 'upload',
      meta: {
        title: 'Upload 示例'
      },
      component: () => import('@/views/Examples/TheUpload/index.vue')
    },
    {
      name: 'TheForm',
      path: 'form',
      meta: {
        title: 'Form 示例'
      },
      component: EmptyView,
      children: [
        {
          name: 'TheFormAddtion',
          path: 'add',
          component: () => import('@/views/Examples/TheForm/index.vue'),
          meta: {
            title: '添加'
          }
        },
        {
          name: 'TheFormEdit',
          path: 'edit',
          component: () => import('@/views/Examples/TheForm/index.vue'),
          meta: {
            title: '编辑'
          }
        }
      ]
    }
  ]
}
export default examplesRoute
