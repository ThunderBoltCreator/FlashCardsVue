<template>
  <div class="input-wrapper" :class="$attrs.class">
    <AppTypography v-if="label" class="label" as="label" :for="name" type="body2">
      {{ label }}
    </AppTypography>
    <div class="icon-wrapper">
      <input
        v-bind="inputAttrs"
        v-model="modelValue"
        class="text-field-input"
        @blur="(event: FocusEvent) => $emit('blur', event)"
        @change="(event: Event) => $emit('change', event)"
      />
      <span v-if="$slots.leftIcon" class="text-field-left-icon">
        <slot name="leftIcon" />
      </span>
      <span v-if="$slots.rightIcon" class="text-field-right-icon">
        <slot name="rightIcon" />
      </span>
    </div>
    <AppTypography v-if="props.errorText" class="error" type="error">{{ errorText }}</AppTypography>
  </div>
</template>
<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import { computed, type InputTypeHTMLAttribute, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false
})

export type AppInputProps = {
  label?: string
  errorText?: string
  name: string
  type?: InputTypeHTMLAttribute
  value: string
}

const props = withDefaults(defineProps<AppInputProps>(), {
  label: '',
  type: 'text',
  errorText: '',
  value: ''
})
defineSlots<{
  leftIcon?: (props: {}) => any
  rightIcon?: (props: {}) => any
}>()
const emit = defineEmits<{
  (e: 'blur', event?: FocusEvent): void
  (e: 'change', event?: any): void
}>()

const modelValue = defineModel<string>()

const inputAttrs = computed(() => {
  const attrs = useAttrs()

  console.log(attrs, 'attrs')
  return {
    ...Object.fromEntries(Object.entries(attrs).filter((el) => el[0] !== 'class')),
    'aria-invalid': !!props.errorText
  }
})
</script>
<style>
.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}
.icon-wrapper {
  position: relative;
}
.label {
  color: var(--color-dark-100);
  text-align: left;
}
.text-field-input {
  width: 100%;
  padding: 6px 12px;

  font-size: var(--font-size-m);
  line-height: var(--line-height-m);
  color: var(--color-light-100);

  background-color: transparent;
  border: 1px solid var(--color-dark-300);
  border-radius: 2px;
  caret-color: var(--color-light-300);
}
.text-field-input:has(+ .text-field-left-icon) {
  padding-left: 41px;
}
.text-field-input:has(+ .text-field-right-icon),
.text-field-input:has(+ * + .text-field-right-icon) {
  padding-right: 10px;
}
.text-field-left-icon {
  left: 12px;
  display: inline-flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.text-field-right-icon {
  right: 12px;
  display: inline-flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.text-field-input::placeholder {
  color: var(--color-dark-100);
}
.text-field-input[aria-invalid='true'] {
  border-color: var(--color-danger-500);
  &::placeholder {
    color: var(--color-danger-500);
  }
}
.text-field-input[type='search'] {
  padding-left: 41px;
}
.text-field-input[type='password'] {
  padding-right: 41px;
}
.text-field-input:hover {
  background-color: var(--color-dark-700);
  border-color: var(--color-dark-100);
}
.text-field-input:active {
  border-color: var(--color-light-100);
  outline: none;
}
.text-field-input:active::placeholder {
  color: var(--color-light-100);
}
.text-field-input:active + .text-field-left-icon {
  fill: var(--color-light-100);
}
.text-field-input:disabled {
  color: var(--color-dark-300);
  border-color: var(--color-dark-300);
}
.text-field-input:disabled::placeholder {
  color: var(--color-dark-300);
}
.text-field-input:focus-visible {
  border-color: transparent;
  outline: var(--color-info-700) solid 2px;
}
.text-field-input:focus-visible:hover {
  border-color: transparent;
  outline-color: var(--color-dark-100);
}
.error {
  text-align: left;
}
</style>
