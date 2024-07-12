import { createFetch } from '@vueuse/core'

const BASE_URL = 'https://api.flashcards.andrii.es'

export const useMyFetch = createFetch({
  baseUrl: BASE_URL,
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  options: {
    onFetchError: async ({ error, data, response }) => {
      if (response?.url.includes('login')) {
        return {
          error,
          data
        }
      }

      if (response?.status === 401) {
        const refreshTokenData = await useMyFetch('/v1/auth/refresh-token', {
          credentials: 'include',
          method: 'POST'
        })

        console.log(refreshTokenData)
      }
    }
  }
})
