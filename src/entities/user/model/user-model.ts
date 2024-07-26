import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface User {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<null | User>(null)
  const isLoggedIn = computed(() => {
    return !!user.value
  })

  function setUser(newUser: null | User) {
    user.value = newUser
  }
  return { user, isLoggedIn, setUser }
})
