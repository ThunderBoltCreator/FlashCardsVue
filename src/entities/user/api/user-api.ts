import { type ApiOptions } from '@/shared/config/api/old-api.ts'
import { useMyFetch } from '@/shared/config/api/api.ts'

export type AuthControllerLoginResult = NonNullable<Awaited<ReturnType<typeof authControllerLogin>>>
export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface LoginRequest {
  email: string
  /**
   * @minLength 3
   * @maxLength 30
   */
  password: string
  rememberMe: boolean
}
/**
 * Sign in using email and password. Must have an account to do so.
 * @summary Sign in using email and password. Must have an account to do so.
 */
// export const authControllerLogin = (loginRequest: LoginRequest, options?: ApiOptions) => {
//   return makeRequest<{
//     accessToken: string
//     refreshToken: string
//   }>({
//     path: '/v1/auth/login',
//     method: 'POST',
//     body: JSON.stringify(loginRequest),
//     ...options
//   })
// }

export const authControllerLogin = (loginRequest: LoginRequest, options?: ApiOptions) => {
  return useMyFetch<{
    accessToken: string
    refreshToken: string
  }>('/v1/auth/login', { method: 'POST', body: JSON.stringify(loginRequest), ...options })
}

export interface User {
  avatar: Blob
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
/**
 * Retrieve current user data.
 * @summary Current user data
 */
// export const authControllerGetUserData = (options?: ApiOptions) => {
//   return makeAuthorizedRequest<User>({ method: 'GET', path: `/v1/auth/me`, ...options })
// }

export const authControllerGetUserData = (options?: ApiOptions) => {
  return useMyFetch<User>('/v1/auth/me', { method: 'GET', credentials: 'include', ...options })
}
