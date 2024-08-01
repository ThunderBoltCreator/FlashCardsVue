import { ref } from 'vue'

export const useLoading = () => {
  const isLoading = ref(false)

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  return [isLoading, setLoading] as const
}
