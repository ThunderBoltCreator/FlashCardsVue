<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import { type InputTypeHTMLAttribute, toRef } from 'vue'
import { useField } from 'vee-validate'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(
  defineProps<{
    label: string
    className?: string
    errorText?: string
    name: string
    value?: string
    type?: InputTypeHTMLAttribute
  }>(),
  {
    type: 'text',
    className: '',
    errorText: '',
    value: ''
  }
)

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleChange,
  handleBlur,
  meta
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<template>
  <div class="input-wrapper" :class="className">
    <AppTypography class="label" as="label" :for="name" type="body2">{{ label }}</AppTypography>
    <input
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="label"
      v-bind="$attrs"
      class="input"
      @input="handleChange"
      @blur="handleBlur"
    />
    <AppTypography v-if="errorText" type="error">{{ errorText }}</AppTypography>
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
