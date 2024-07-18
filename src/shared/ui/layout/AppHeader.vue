<template>
  <header>
    <div class="container">header {{ user.authorization }}</div>
  </header>
</template>
<script setup>
import { useUserStore } from '@/entities/user'

const user = useUserStore()
</script>
<style scoped></style>
