import { createRouter, createWebHistory } from 'vue-router'
import { LoginPage } from '@/pages/login'
import { HomePage } from '@/pages/home'
import { getMe } from '@/pages/login/model/login-page-model.ts'
import { useUserStore } from '@/entities/user'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          component: HomePage
        }
        // {
        //   path: 'page2',
        //   component: Page2
        // }
      ],
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      component: LoginPage,
      meta: {
        requiredAnonymous: true
      }
    }
  ]
})

router.beforeEach(async (to, from) => {
  await getMe()
  const userStore = useUserStore()

  if (userStore.isLoggedIn && to.meta.requiredAnonymous) {
    return { path: '/', replace: true }
  }

  if (!userStore.isLoggedIn && to.meta.requiredAuth) {
    return { path: '/login', replace: true }
  }

  return true
})
