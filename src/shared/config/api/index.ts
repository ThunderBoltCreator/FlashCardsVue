// export const baseApi = axios.create({
//   baseURL: 'https://api.flashcards.andrii.es/',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   withCredentials: true
// })
export const makeRequest = <T>(path: string, options?: RequestInit): Response => {
  const BASE_URL = 'https://api.flashcards.andrii.es/'
  const BASE_OPTIONS: RequestInit = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const config = {
    ...options,
    ...BASE_OPTIONS
  }

  return fetch(BASE_URL + path, config)
}

export const makeAuthorizedRequest = (url: string, options: RequestInit) => {
  const config: RequestInit = {
    ...options,
    credentials: 'include'
  }
  return makeRequest(url, config)
}

export type BodyType<Data> = Data
