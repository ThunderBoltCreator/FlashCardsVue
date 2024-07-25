<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import { computed, type InputTypeHTMLAttribute, toRef } from 'vue'
import { useField } from 'vee-validate'

defineOptions({
  inheritAttrs: false
})

export type AppInputProps = {
  label: string
  className?: string
  errorText?: string
  name: string
  value?: string
  type?: InputTypeHTMLAttribute
}

const props = withDefaults(defineProps<AppInputProps>(), {
  type: 'text',
  className: '',
  errorText: '',
  value: ''
})

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

const fieldEventGetter = ({ meta, errorMessage }) => {
  if (errorMessage.value) {
    return ['input']
  }

  return []
}

const handlers = computed(() => {
  const on: Record<string, any> = {
    blur: handleBlur,
    input: [(e: unknown) => handleChange(e, false)]
  }

  const triggers = fieldEventGetter({ meta, errorMessage })

  triggers.forEach((t) => {
    if (Array.isArray(on[t])) {
      on[t].push(handleChange)
    } else {
      on[t] = handleChange
    }
  })

  return on
})
</script>

<template>
  <div class="input-wrapper" :class="className">
    <AppTypography class="label" as="label" :for="name" type="body2">{{ label }}</AppTypography>
    <div class="icon-wrapper">
      <input
        :id="name"
        :type="type"
        :value="inputValue"
        :placeholder="label"
        v-bind="$attrs"
        class="input"
        v-on="handlers"
      />
      <slot />
    </div>
    <AppTypography v-if="errorText" type="error">{{ errorText }}</AppTypography>
  </div>
</template>

<style scoped>
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
