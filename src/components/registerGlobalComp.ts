import { App } from 'vue'

const components: any[] = []

export default function registerGlobalComp(app: App) {
  components.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
