import { App } from 'vue'

import { Button, Icon, Col, Row } from 'vant'

const components = [Button, Icon, Col, Row]

export default function registerGlobalComp(app: App) {
  components.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
