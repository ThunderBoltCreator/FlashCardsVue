<script lang="ts" setup>
import {
  SelectRoot,
  SelectContent,
  SelectViewport,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectItemText,
  SelectItem
} from 'radix-vue'
import IconBase from '@/shared/ui/icon/IconBase.vue'

const props = defineProps<{
  options: (string | number)[]
  value: string | number
  onChange: (value: string) => void
}>()
</script>
<template>
  <SelectRoot :model-value="value.toString()" @update:model-value="onChange">
    <SelectTrigger class="select-trigger">
      <SelectValue />
      <SelectIcon class="trigger-icon">
        <IconBase name="sprite/paginate-arrow-left" />
      </SelectIcon>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent position="popper" :side-offset="-1" class="select-content">
        <SelectViewport>
          <SelectItem
            v-for="option in props.options"
            :key="option"
            :value="option.toString()"
            class="select-item"
          >
            <SelectItemText>{{ option }}</SelectItemText>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
<style scoped>
.select-trigger {
  cursor: pointer;

  display: inline-flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  padding: 4px 6px;
  color: var(--color-light-100);
  background-color: transparent;
  border: 1px solid var(--color-dark-300);
  border-radius: 2px;
  transition: background-color 0.3s ease-out;
}
.trigger-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(270deg);
  transition: 0.3s ease;
}
.select-trigger[data-state='open'] .trigger-icon {
  transform: rotate(90deg);
}
.select-trigger:focus,
.select-trigger:focus-visible {
  outline: 2px solid var(--color-info-700);
}
.select-trigger:hover:not([data-disabled]) {
  background-color: var(--color-dark-500);
  border-color: var(--color-dark-100);
}
.select-trigger[data-disabled] {
  color: var(--color-dark-300);
}
:deep(.select-content) {
  z-index: 301;

  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);

  border: 1px solid var(--color-dark-100);
  border-radius: 0 0 2px 2px;
  user-select: none;
}
:deep(.select-item) {
  cursor: pointer;

  padding: 0.37rem 0.69rem;

  background-color: var(--color-dark-900);
  outline: none;

  transition: background-color 0.4s;

  &:hover {
    background-color: var(--color-accent-900);
  }
}
:deep(.select-item[data-state='checked']) {
  background-color: var(--color-accent-500);
  cursor: default;
  pointer-events: none;
}
</style>
