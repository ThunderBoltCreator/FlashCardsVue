<script setup>
import { MiniProfile } from '@/widgets/mini-profile'
</script>
<template>
  <header>
    <div class="container header">
      <RouterLink to="/">Logo</RouterLink>
      <MiniProfile />
    </div>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;
}
</style>
