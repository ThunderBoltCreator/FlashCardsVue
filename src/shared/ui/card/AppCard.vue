<script setup lang="ts">
import type { IntrinsicElementAttributes } from 'vue'

const props = defineProps<{
  as?: keyof IntrinsicElementAttributes
}>()

const tag = props.as || 'section'
</script>
<template>
  <component :is="tag" class="card">
    <slot />
  </component>
</template>
<style scoped>
.card {
  text-align: center;
  background-color: var(--color-dark-700);
  border: 1px solid var(--color-dark-500);
  border-radius: 2px;
  box-shadow:
    -1px -1px 2px 0px #0000001a,
    1px 1px 2px 0px #0000001a;
}
</style>
