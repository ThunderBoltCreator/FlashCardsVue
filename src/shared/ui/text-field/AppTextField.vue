<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import { computed, type InputTypeHTMLAttribute, toRef } from 'vue'
import { useField, FieldMeta } from 'vee-validate'

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
  isFormInput?: boolean
}

const props = withDefaults(defineProps<AppInputProps>(), {
  type: 'text',
  className: '',
  errorText: '',
  value: '',
  isFormInput: true
})
const model = defineModel<string>()

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleChange,
  handleBlur,
  meta
} = useField<string>(name, undefined, {
  initialValue: props.value
})

const fieldEventGetter = (errorMsg: typeof errorMessage, meta: FieldMeta<string>) => {
  if (errorMsg.value) {
    return ['input']
  }

  return []
}

const isError = computed(() => {
  return errorMessage.value ? true : Boolean(props.errorText)
})
const error = computed(() => {
  return errorMessage.value || props.errorText
})

const handlers = computed(() => {
  const on: Record<string, any> = {
    blur: handleBlur,
    input: [(e: unknown) => handleChange(e, false)]
  }

  const triggers = fieldEventGetter(errorMessage, meta)

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
        v-if="props.isFormInput"
        :id="name"
        :aria-invalid="isError"
        :type="type"
        :value="inputValue"
        :placeholder="label"
        v-bind="$attrs"
        class="input"
        v-on="handlers"
      />
      <input
        v-else
        v-model="model"
        :type="type"
        :placeholder="label"
        v-bind="$attrs"
        class="input"
      />
      <slot />
    </div>
    <AppTypography v-if="isError" class="error" type="error">{{ error }}</AppTypography>
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
}
.input::placeholder {
  color: var(--color-dark-100);
}
.input[aria-invalid='true'] {
  border-color: var(--color-danger-500);
}
.input[type='search'] {
  padding-left: 41px;
}
.input[type='password'] {
  padding-right: 41px;
}
.input:hover {
  background-color: var(--color-dark-700);
  border-color: var(--color-dark-100);
}
.input:active {
  border-color: var(--color-light-100);
  outline: none;
}
.input:active::placeholder {
  color: var(--color-light-100);
}
.input:active + .leftIcon {
  fill: var(--color-light-100);
}
.input:disabled {
  color: var(--color-dark-300);
  border-color: var(--color-dark-300);
}
.input:disabled::placeholder {
  color: var(--color-dark-300);
}
.input:focus-visible {
  border-color: transparent;
  outline: var(--color-info-700) solid 2px;
}
.input:focus-visible:hover {
  border-color: transparent;
  outline-color: var(--color-dark-100);
}
.error {
  text-align: left;
}
</style>
