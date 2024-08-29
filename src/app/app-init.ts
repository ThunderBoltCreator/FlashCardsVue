import { useUserStore } from '@/entities/user'
export async function initializeApp() {
  const userStore = useUserStore()

  await userStore.fetchUser()
}
