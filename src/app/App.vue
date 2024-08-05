<script setup lang="ts">
import { Layout } from '@/shared/ui/layout'
import { onBeforeMount } from 'vue'
import { getMe } from '@/entities/user'

onBeforeMount(async () => {
  await getMe()
})
</script>

<template>
  <Layout />
</template>

<style scoped></style>
