<script setup lang="ts">
import { Layout } from '@/shared/ui/layout'
import { watchEffect } from 'vue'
import { useUserStore } from '@/entities/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

/**
 * use on logout
 */
watchEffect(async () => {
  if (!userStore.isLoggedIn) {
    await router.push('/login')
  }
})
</script>

<template>
  <Layout />
</template>

<style scoped></style>
