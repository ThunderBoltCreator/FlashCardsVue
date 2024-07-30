<script setup lang="ts">
import AppSpinner from './AppSpinner.vue'
</script>
<template>
  <div class="spinner-wrapper">
    <AppSpinner />
  </div>
</template>
<style scoped>
.spinner-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
