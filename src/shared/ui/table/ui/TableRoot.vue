<script lang="ts" setup></script>
<template>
  <table class="table-root">
    <slot></slot>
  </table>
</template>
<style scoped>
.table-root {
  border-collapse: collapse;
  border: 1px solid var(--color-dark-500);
}
</style>
