<script setup>
import { ref } from 'vue'
import { AppHeader } from '@/shared/ui/layout'
</script>
<template>
  <AppHeader />
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>
<style scoped>
header {
  height: 60px;
  background-color: var(--color-dark-700);
  border-bottom: 1px solid var(--color-dark-500);
}
.icon-eye {
  font-size: 36px;
}
.input {
  color: #111;
}
.container {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
