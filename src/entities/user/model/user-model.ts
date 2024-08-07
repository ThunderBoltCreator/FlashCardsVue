import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authControllerLogin, type LoginRequest } from '@/entities/user'
import { type ResponseFromModel } from '@/shared/lib/notifications.ts'
import { setLocalStorage } from '@/shared/lib/local-storage.ts'
import { type AppError } from '@/shared/config/api/api.ts'
import {
  authControllerGetUserData,
  authControllerLogout,
  authControllerUpdateUserData
} from '../api/user-api.ts'
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

  async function fetchUser(): Promise<ResponseFromModel> {
    try {
      user.value = await authControllerGetUserData()

      return {
        type: 'success',
        message: 'Данные пользователя получены'
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e)
      }
      return {
        type: 'error',
        message: 'Не удалось получить данные пользователя'
      }
    }
  }

  async function logout(): Promise<ResponseFromModel> {
    try {
      await authControllerLogout()
      user.value = null

      await router.push('/login')

      return {
        type: 'success',
        message: 'Вы вышли из аккаунта'
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e)
      }
      return {
        type: 'error',
        message: 'Не удалось выйти из аккаунта'
      }
    }
  }

  async function login(data: LoginRequest): Promise<ResponseFromModel> {
    try {
      const res = await authControllerLogin(data)
      setLocalStorage('accessToken', res.accessToken)

      await fetchUser()
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

  async function changeProfile(newUserData: FormData): Promise<ResponseFromModel> {
    try {
      user.value = await authControllerUpdateUserData(newUserData)
      return {
        type: 'success',
        message: 'Данные пользователя обновлены'
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(e)
      }
      return {
        type: 'error',
        message: 'Не удалось обновить данные пользователя'
      }
    }
  }

  return { user, isLoggedIn, setUser, logout, fetchUser, login, changeProfile }
})
