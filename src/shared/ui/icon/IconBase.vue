<template>
  <svg
    :aria-hidden="true"
    :class="['icon', className]"
    :data-axis="axis"
    focusable="false"
    :viewBox="viewBox"
    v-bind="props"
  >
    <use :href="`/sprites/${filePath}#${iconName}`" />
  </svg>
</template>

<script setup lang="ts">
import { type AnyIconName, getIconMeta } from './getIconMeta'

const props = defineProps<{
  name: AnyIconName
  className?: string
}>()

const { axis, filePath, iconName, viewBox } = getIconMeta(props.name)
</script>

<style scoped>
.icon {
  user-select: none;
  fill: currentColor;
  display: inline-block;
  color: inherit;
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  background-color: transparent;

  use {
    background-color: transparent;
  }
}
</style>
