import { createRouter, createWebHistory } from 'vue-router'
import { LoginPage } from '@/pages/login'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginPage
    }
  ]
})
