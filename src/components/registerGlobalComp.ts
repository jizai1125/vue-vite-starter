import { App } from 'vue'

export default function registerComponents(app: App) {
  const components = import.meta.glob('./**/**.vue', { eager: true })
  Object.keys(components).forEach((it: any) => {
    const component = components[it] as any
    app.component(component.default.name, component.default)
  })
}
