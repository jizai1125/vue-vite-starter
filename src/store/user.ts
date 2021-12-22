import { defineStore } from 'pinia'

export default defineStore('user', {
  state() {
    return {
      username: 'jizai',
      role: 'admin'
    }
  }
})
