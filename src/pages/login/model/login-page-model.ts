import { authControllerLogin, type LoginRequest, userModel } from '@/entities/user'
import { authControllerGetUserData } from '@/entities/user/api/user-api.ts'

export async function login(data: LoginRequest) {
  try {
    const res = await authControllerLogin(data)
    // setLocalStorage('accessToken', res.accessToken)
    // setLocalStorage('refreshToken', res.refreshToken)

    console.log('new res', res)

    userModel.setAuthorization(true)
    return {
      message: 'Вы авторизованы!'
    }
  } catch (e) {
    console.log(e)
    return {
      errorMessage: 'Неверный логин или пароль'
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
