import { type SecondParameter } from '@/shared/config/api/generated'
import { makeRequest } from '@/shared/config/api'

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
export const authControllerLogin = (
  loginRequest: LoginRequest,
  options?: SecondParameter<typeof makeRequest>
) => {
  return makeRequest<{
    accessToken: string
    refreshToken: string
  }>('/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(loginRequest),
    ...options
  })
}
