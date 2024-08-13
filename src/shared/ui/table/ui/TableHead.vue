<script setup lang="ts"></script>
<template>
  <thead class="table-head">
    <slot></slot>
  </thead>
</template>
<style scoped>
.table-head {
  text-align: left;
  background-color: var(--color-dark-500);
}
</style>
