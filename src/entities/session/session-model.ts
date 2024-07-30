import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
  const isLoading = ref(false)

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  return {
    isLoading,
    setLoading
  }
})
