import { authControllerLogin, type LoginRequest, useUserStore } from '@/entities/user'
import { authControllerGetUserData } from '@/entities/user/api/user-api.ts'
import { setLocalStorage } from '@/shared/lib/local-storage.ts'
import type { AppError } from '@/shared/config/api/api.ts'
import type { ResponseFromModelToUI } from '@/shared/lib/notifications.ts'

export async function login(data: LoginRequest): Promise<ResponseFromModelToUI> {
  try {
    const res = await authControllerLogin(data)

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
  const userStore = useUserStore()
  try {
    const res = await authControllerGetUserData()

    userStore.setUser(res)
    console.log(res)
  } catch (error) {
    console.log('login-page-model error', error)
  }
}
