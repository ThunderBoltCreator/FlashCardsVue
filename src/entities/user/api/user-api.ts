import { type ApiOptions, makeAuthorizedRequest } from '@/shared/config/api/api.ts'
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
  return makeAuthorizedRequest<LoginResponse>({
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
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    ...options
  })
}

/**
 * Sign current user out
 * @summary Sign current user out
 */
export const authControllerLogout = (options?: ApiOptions) => {
  return makeAuthorizedRequest<void>({ method: 'POST', path: `/v1/auth/logout`, ...options })
}

export interface UpdateUserRequest {
  avatar?: Blob
  name?: string
}

/**
 * Update current user data.
 * @summary Update user data
 */
export const authControllerUpdateUserData = (updateUserRequest: FormData, options?: ApiOptions) => {
  console.log('has avatar', updateUserRequest.has('avatar'))
  console.log('has name', updateUserRequest.has('name'))

  return makeAuthorizedRequest<User>({
    body: updateUserRequest,
    method: 'PATCH',
    path: '/v1/auth/me',
    ...options
  })
}
