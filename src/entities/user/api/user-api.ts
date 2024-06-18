import { createInstance, type BodyType } from '@/shared/config/api'
import { type SecondParameter } from '@/shared/config/api/generated'

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
  loginRequest: BodyType<LoginRequest>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<LoginResponse>(
    {
      data: loginRequest,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      url: `/v1/auth/login`
    },
    options
  )
}
