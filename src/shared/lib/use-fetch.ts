import type { Ref } from 'vue'

export const useFetch = async <T>(
  request: () => Promise<T>,
  isLoading: Ref<boolean>
): Promise<T> => {
  isLoading.value = true
  const response = await request()

  isLoading.value = false
  return response
}
