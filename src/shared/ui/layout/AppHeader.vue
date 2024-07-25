<script setup>
import { useUserStore } from '@/entities/user'
import { MiniProfile } from '@/widgets/mini-profile'

const user = useUserStore()
</script>
<template>
  <header>
    <div class="container header">
      <div class="logo">
        <RouterLink to="/">Logo</RouterLink>
      </div>
      <div class="profile">
        <MiniProfile />
      </div>
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
