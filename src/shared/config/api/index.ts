import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

export const baseApi = axios.create({
  baseURL: 'https://api.flashcards.andrii.es/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return baseApi({
    ...config,
    ...options
  }).then((r) => r.data)
}
export type BodyType<Data> = Data

export type ErrorType<Error> = AxiosError<Error>
