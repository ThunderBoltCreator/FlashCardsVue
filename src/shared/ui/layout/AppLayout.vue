<script setup>
import IconBase from '@/shared/ui/icon/IconBase.vue'
import TextField from '@/shared/ui/text-field/AppTextField.vue'
import { ref } from 'vue'
const text = ref('')
</script>
<template>
  <header><div class="container">header</div></header>

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
