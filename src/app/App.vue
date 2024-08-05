<script setup lang="ts">
import { Layout } from '@/shared/ui/layout'
import { onBeforeMount } from 'vue'
import { useUserStore } from '@/entities/user'

onBeforeMount(async () => {
  const userStore = useUserStore()
  await userStore.fetchUser()
})
</script>

<template>
  <Layout />
</template>

<style scoped></style>
