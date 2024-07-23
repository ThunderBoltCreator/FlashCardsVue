import { createRouter, createWebHistory } from 'vue-router'
import { LoginPage } from '@/pages/login'
import { HomePage } from '@/pages/home'
import { getMe } from '@/pages/login/model/login-page-model.ts'

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
      ],
      meta: {
        requiresAuth: true
      },
      beforeEnter: async () => {
        const me = await getMe()

        if (me.type === 'error') {
          return { path: '/login', replace: true }
        }
      }
    },
    {
      path: '/login',
      component: LoginPage,
      meta: {
        requiresAnonymous: true
      }
    }
  ]
})

// router.beforeEach((to, from) => {
//   const userStore = useUserStore()
//
//   if (to.meta.requiresAnonymous && userStore.isAuthorization) {
//     return { path: '/', replace: true }
//   }
//
//   if (to.meta.requiresAuth && !userStore.isAuthorization) {
//     return { path: '/login', replace: true }
//   }
//
//   return true
// })
