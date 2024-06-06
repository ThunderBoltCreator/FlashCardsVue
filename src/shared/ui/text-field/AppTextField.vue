<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import { useId } from 'radix-vue'

defineOptions({
  inheritAttrs: false
})

defineProps<{
  label: string
  className?: string
}>()

const inputText = defineModel<string>()
const id = useId()
</script>

<template>
  <div class="input-wrapper" :class="className">
    <AppTypography class="label" as="label" :for="id" type="body2">{{ label }}</AppTypography>
    <input :id="id" v-model="inputText" v-bind="$attrs" class="input" />
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}
.label {
  color: var(--color-dark-100);
  text-align: left;
}
.input {
  width: 100%;
  padding: 6px 12px;

  font-size: var(--font-size-m);
  line-height: var(--line-height-m);
  color: var(--color-light-100);

  background-color: transparent;
  border: 1px solid var(--color-dark-300);
  border-radius: 2px;
  caret-color: var(--color-light-300);

  &::placeholder {
    color: var(--color-dark-100);
  }

  &[type='search'] {
    padding-left: 41px;
  }

  &[type='password'] {
    padding-right: 41px;
  }

  &:hover {
    background-color: var(--color-dark-700);
    border-color: var(--color-dark-100);
  }

  &:active {
    border-color: var(--color-light-100);
    outline: none;

    &::placeholder {
      color: var(--color-light-100);
    }

    + .leftIcon {
      fill: var(--color-light-100);
    }
  }

  &:disabled {
    color: var(--color-dark-300);
    border-color: var(--color-dark-300);

    &::placeholder {
      color: var(--color-dark-300);
    }
  }

  &:focus-visible {
    border-color: transparent;
    outline: var(--color-info-700) solid 2px;

    &:hover {
      border-color: transparent;
      outline-color: var(--color-dark-100);
    }
  }
}
</style>
