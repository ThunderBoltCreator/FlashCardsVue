import { authControllerLogin, type LoginRequest, useUserStore } from '@/entities/user'
import { authControllerGetUserData } from '@/entities/user/api/user-api.ts'
import { setLocalStorage } from '@/shared/lib/local-storage.ts'
import type { AppError } from '@/shared/config/api/api.ts'
import type { ResponseFromModel } from '@/shared/lib/notifications.ts'

export async function login(data: LoginRequest): Promise<ResponseFromModel> {
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

export async function getMe(): Promise<ResponseFromModel> {
  const userStore = useUserStore()
  try {
    const res = await authControllerGetUserData()

    userStore.setUser(res)
    console.log(res)

    return {
      type: 'success',
      message: 'Данные пользователя получены'
    }
  } catch (error) {
    console.log('login-page-model error', error)
    return {
      type: 'error',
      message: 'Не удалось получить данные пользователя'
    }
  }
}
