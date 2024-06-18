import { authControllerLogin, type LoginRequest } from '@/entities/user'

export async function login(data: LoginRequest) {
  const res = await authControllerLogin(data)
  localStorage.setItem('accessToken', res.accessToken)
}
