// export const baseApi = axios.create({
//   baseURL: 'https://api.flashcards.andrii.es/',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   withCredentials: true
// })
export const makeRequest = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const BASE_URL = 'https://api.flashcards.andrii.es'
  const BASE_OPTIONS: RequestInit = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const config = {
    ...options,
    ...BASE_OPTIONS
  }

  const res = await fetch(BASE_URL + path, config)

  if (!res.ok) {

    if (res.status === 401) {
       options.
    }
    console.log('error response', res, await res.json())
  }

  return res.json()
}

export const makeAuthorizedRequest = (url: string, options: RequestInit) => {
  const config: RequestInit = {
    ...options,
    credentials: 'include'
  }
  return makeRequest(url, config)
}
