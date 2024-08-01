import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authControllerLogin, type LoginRequest } from '@/entities/user'
import { type ResponseFromModel } from '@/shared/lib/notifications.ts'
import { setLocalStorage } from '@/shared/lib/local-storage.ts'
import { type AppError } from '@/shared/config/api/api.ts'
import { authControllerGetUserData, authControllerLogout } from '../api/user-api.ts'
import { router } from '@/shared/config/router'

export interface User {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<null | User>(null)
  const isLoggedIn = computed(() => {
    return !!user.value
  })

  function setUser(newUser: null | User) {
    user.value = newUser
  }

  function logout() {
    user.value = null
  }
  return { user, isLoggedIn, setUser, logout }
})

export async function login(data: LoginRequest): Promise<ResponseFromModel> {
  try {
    const res = await authControllerLogin(data)

    setLocalStorage('accessToken', res.accessToken)

    await router.push('/')
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

export async function logout(): Promise<ResponseFromModel> {
  const userStore = useUserStore()
  try {
    await authControllerLogout()
    userStore.logout()

    await router.push('/login')

    return {
      type: 'success',
      message: 'Вы вышли из аккаунта'
    }
  } catch (e) {
    return {
      type: 'error',
      message: 'Не удалось выйти из аккаунта'
    }
  }
}
