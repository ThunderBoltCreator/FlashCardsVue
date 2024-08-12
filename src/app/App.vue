<script setup lang="ts">
import { Layout } from '@/shared/ui/layout'
import { onBeforeMount, ref } from 'vue'
import { useUserStore } from '@/entities/user'
import { useRoute, useRouter } from 'vue-router'
import { useMyFetch } from '@/shared/lib/use-my-fetch.ts'
import { FullPageSpinner } from '@/shared/ui/spinner'

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)

onBeforeMount(async () => {
  const userStore = useUserStore()
  await useMyFetch(userStore.fetchUser, isLoading)

  if (route.fullPath === '/login' && userStore.isLoggedIn) {
    await router.push({ path: '/', replace: true })
  }
})
</script>

<template>
  <Layout v-if="!isLoading" />
  <FullPageSpinner v-else />
</template>

<style scoped></style>
