import { authControllerLogin, type LoginRequest, userModel } from '@/entities/user'
import { authControllerGetUserData } from '@/entities/user/api/user-api.ts'
import { setLocalStorage } from '@/shared/lib/local-storage.ts'

export async function login(data: LoginRequest) {
  try {
    const res = await authControllerLogin(data)

    userModel.setAuthorization(true)
    setLocalStorage('accessToken', res.accessToken)

    return {
      message: 'Вы авторизованы!'
    }
  } catch (e) {
    console.log(e)
    return {
      errorMessage: e.message
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
