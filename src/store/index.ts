import { defineStore } from 'pinia'
import useUserStore from './user'

interface TestObject {
  label: string
  phone: number
}

export default defineStore({
  id: 'app',
  state: () => {
    const user = useUserStore()
    return {
      title: 'vue-vite-starter（h5）',
      user,
      obj: undefined as TestObject | undefined
    }
  },
  getters: {
    userRole: (state) => state.user.role
  },
  actions: {
    changeTitle() {
      this.title = 'vue+vite+starter（h5）'
    }
  }
})
