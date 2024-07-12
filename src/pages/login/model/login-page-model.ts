import { authControllerLogin, type LoginRequest, userModel } from '@/entities/user'
import { authControllerGetUserData } from '@/entities/user/api/user-api.ts'
import { setLocalStorage } from '@/shared/lib/local-storage.ts'
import type { AppError } from '@/shared/config/api/old-api.ts'
import type { ResponseFromModelToUI } from '@/shared/lib/notifications.ts'

export async function login(data: LoginRequest): Promise<ResponseFromModelToUI> {
  try {
    const res = await authControllerLogin(data)

    userModel.setAuthorization(true)
    setLocalStorage('accessToken', res.accessToken)

    return {
      type: 'success',
      message: 'Вы авторизованы!'
    }
  } catch (e) {
    const error = e as AppError

    return {
      type: 'error',
      message: error.message
    }
  }
}

export async function getMe() {
  try {
    const res = await authControllerGetUserData()
    console.log(res)
  } catch (error) {
    console.log('login-page-model error', error)
  }
}
