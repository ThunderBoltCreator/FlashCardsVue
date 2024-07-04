import { type ApiOptions, makeAuthorizedRequest, makeRequest } from '@/shared/config/api'

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
export const authControllerLogin = (loginRequest: LoginRequest, options?: ApiOptions) => {
  return makeRequest<{
    accessToken: string
    refreshToken: string
  }>({
    path: '/v1/auth/login',
    method: 'POST',
    body: JSON.stringify(loginRequest),
    ...options
  })
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
export const authControllerGetUserData = (options?: ApiOptions) => {
  return makeAuthorizedRequest<User>({ method: 'GET', path: `/v1/auth/me`, ...options })
}
