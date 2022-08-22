import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./*.ts', { eager: true })

const routes = Object.keys(modules).reduce((acc: RouteRecordRaw[], key) => {
  const module = (modules[key] as any).default
  acc.push(module)
  return acc
}, [])

export default routes
