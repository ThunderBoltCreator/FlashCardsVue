import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from '@/shared/config/router'
import '@/shared/ui/styles/index.scss'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { initializeApp } from '@/app/app-init.ts'

const app = createApp(App)

app.use(createPinia())
await initializeApp()

app.use(router)

app.use(Vue3Toastify, {
  autoClose: 3000,
  limit: 3,
  clearOnUrlChange: false
} as ToastContainerOptions)

app.mount('#app')
