<script setup>
import { MiniProfile } from '@/widgets/mini-profile'
import { useUserStore } from '@/entities/user'
import { Button } from '@/shared/ui/button'

const userStore = useUserStore()
</script>
<template>
  <header>
    <div class="container header">
      <RouterLink to="/">Logo</RouterLink>
      <MiniProfile v-if="userStore.isLoggedIn" />
      <Button v-else type="button" variant="secondary">
        <RouterLink to="/login"> Sign In </RouterLink>
      </Button>
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
