import { type ApiOptions, makeRequest, makeAuthorizedRequest } from '@/shared/config/api/api.ts'
import type { User } from '@/entities/user'

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
  return makeRequest<LoginResponse>({
    path: '/v1/auth/login',
    method: 'POST',
    body: JSON.stringify(loginRequest),
    ...options
  })
}

/**
 * Retrieve current user data.
 * @summary Current user data
 */

export const authControllerGetUserData = (options?: ApiOptions) => {
  return makeAuthorizedRequest<User>({
    path: '/v1/auth/me',
    method: 'GET',
    ...options
  })
}
