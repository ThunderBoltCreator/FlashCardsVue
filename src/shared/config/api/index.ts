// export const baseApi = axios.create({
//   baseURL: 'https://api.flashcards.andrii.es/',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   withCredentials: true
// })

export type ApiOptions = RequestInit & { path: string }
export const makeRequest = async <T>(options?: ApiOptions): Promise<T> => {
  const BASE_URL = 'https://api.flashcards.andrii.es'
  const BASE_OPTIONS: RequestInit = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const config: RequestInit = {
    ...BASE_OPTIONS,
    ...options
  }
  const request = new Request(BASE_URL + options?.path, config)
  const cloneRequest = request.clone()

  try {
    const requestResponse = await fetch(request)

    if (!requestResponse.ok && !requestResponse.url.includes('login')) {
      if (requestResponse.status === 401) {
        const refreshResponse = await fetch(BASE_URL + '/v1/auth/refresh-token', {
          credentials: 'include',
          method: 'POST'
        })

        if (refreshResponse.ok) {
          const requestResponse = await fetch(cloneRequest)

          return requestResponse.json()
        } else {
          return Promise.reject('Вы не авторизованы')
        }
      }

      return Promise.reject('')
    }

    return requestResponse.json()
  } catch (error) {
    console.log('api error wrapper catch', error)
    return Promise.reject('ahahahahahaha')
  }
}

export const makeAuthorizedRequest = <T>(options: ApiOptions) => {
  const config: ApiOptions = {
    ...options,
    credentials: 'include'
  }
  return makeRequest<T>(config)
}
