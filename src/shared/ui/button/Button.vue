<script setup lang="ts">
export type ButtonProps = {
  fullWidth?: boolean
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
}
defineProps<ButtonProps>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
<template>
  <button
    class="button"
    :class="[fullWidth && 'fullwidth', variant ?? 'primary']"
    @click="emit('click')"
  >
    <slot name="left-icon" />
    <slot />
    <slot name="right-icon" />
  </button>
</template>

<style scoped lang="scss">
.button {
  color: var(--color-light-100);
  display: flex;
  column-gap: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  padding: 6px 28px;
  cursor: pointer;
  transition: 0.3s ease;

  &:disabled {
    color: var(--color-light-900);
    pointer-events: none;
  }
}
.primary {
  background-color: var(--color-accent-500);
  box-shadow: 0 4px 18px 0 rgba(140, 97, 255, 0.35);

  &:hover {
    background-color: var(--color-accent-300);
  }

  &:active {
    background-color: var(--color-accent-700);
  }
  &:focus-visible {
    outline: 2px solid var(--color-info-700);
  }

  &:disabled {
    background-color: var(--color-accent-900);
    box-shadow: 0 4px 18px 0 rgba(140, 97, 255, 0.35);
  }
}
.secondary {
  background-color: var(--color-dark-300);
  box-shadow: 0 2px 10px 0 rgba(109, 109, 109, 0.25);

  &:hover {
    background-color: var(--color-dark-100);
  }

  &:active {
    background-color: var(--color-dark-500);
  }

  &:focus-visible {
    outline: 2px solid var(--color-info-700);
    background-color: var(--color-dark-300);
  }
}
.fullwidth {
  width: 100%;
}
</style>
