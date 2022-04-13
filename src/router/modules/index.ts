import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./*.ts')

const routes = Object.keys(modules).reduce((acc: RouteRecordRaw[], key) => {
  const module = modules[key].default
  acc.push(module)
  return acc
}, [])

export default routes
