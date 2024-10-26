import { createRouter, createWebHistory } from 'vue-router'
import { LoginPage } from '@/pages/login'
import { DecksPage } from '@/pages/decks'
import { useUserStore } from '@/entities/user'
import { ProfilePage } from '@/pages/profile'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
  }
}
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: 'decks',
          component: DecksPage
        },
        {
          path: 'profile',
          component: ProfilePage
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: LoginPage,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()

  if (userStore.isLoggedIn && !to.meta.requiresAuth) {
    return { path: '/decks', replace: true }
  }

  if (!userStore.isLoggedIn && to.meta.requiresAuth) {
    return { path: '/login', replace: true }
  }
})
