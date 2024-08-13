<script lang="ts" setup=""></script>
<template>
  <tr class="table-row">
    <slot></slot>
  </tr>
</template>
<style scoped>
.table-row:not(:last-child) {
  border-bottom: 1px solid var(--color-dark-500);
}
</style>
