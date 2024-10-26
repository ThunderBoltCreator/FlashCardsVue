<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import {
  computed,
  type InputTypeHTMLAttribute,
  onMounted,
  toRaw,
  toRef,
  toValue,
  useAttrs
} from 'vue'
import { useField, FieldMeta } from 'vee-validate'

defineOptions({
  inheritAttrs: false
})

export type AppInputProps = {
  label?: string
  errorText?: string
  name: string
  modelValue?: string
  type?: InputTypeHTMLAttribute
  isFormInput?: boolean
}

const props = withDefaults(defineProps<AppInputProps>(), {
  label: '',
  type: 'text',
  errorText: '',
  modelValue: '',
  isFormInput: false
})
defineSlots<{
  leftIcon?: (props: {}) => any
  rightIcon?: (props: {}) => any
}>()
const emit = defineEmits<{
  (e: 'change', modelValue: string): void
}>()

const name = toRef(props, 'name')
const attrs = useAttrs()

const {
  value: inputValue,
  errorMessage,
  handleChange,
  handleBlur,
  meta
} = useField<string>(name, undefined, {
  initialValue: props.modelValue
})
const inputAttrs = computed(() => {
  const baseAttrs = {
    ...Object.fromEntries(Object.entries(attrs).filter((el) => el['key'] !== 'class')),
    type: props.type
  }
  if (props.isFormInput) {
    return {
      ...baseAttrs,
      id: props.name,
      'aria-invalid': isError,
      value: toValue(inputValue),
      class: 'input'
    }
  } else {
    return {
      ...baseAttrs,
      value: props.modelValue,
      type: props.type,
      class: 'input'
    }
  }
})

const isError = computed(() => {
  return errorMessage.value ? true : Boolean(props.errorText)
})
const error = computed(() => {
  return errorMessage.value || props.errorText
})

const fieldEventGetter = (errorMsg: typeof errorMessage, meta: FieldMeta<string>) => {
  if (errorMsg.value) {
    return ['input']
  }

  return []
}
const handlers = computed(() => {
  const on: Record<string, any> = {
    blur: handleBlur,
    // input: [(e: unknown) => handleChange(e, false)],
    input: [
      (event: Event) => {
        const target = event.target as HTMLInputElement
        emit('change', target.value)
      }
    ]
  }

  const triggers = fieldEventGetter(errorMessage, meta) // ['input']

  triggers.forEach((t) => {
    if (Array.isArray(on[t])) {
      // t === 'input', on['input'] = fn => else
      on[t].push(handleChange)
    } else {
      on[t] = (e: Event) => handleChange(e, false)
    }
  })

  return on
})

const wrapperClasses = computed(() => {
  return attrs.class
})

onMounted(() => {
  console.log('inputValue', toValue(inputValue))
})
</script>

<template>
  <div class="input-wrapper" :class="wrapperClasses">
    <AppTypography v-if="label" class="label" as="label" :for="name" type="body2">
      {{ label }}
    </AppTypography>
    <div class="icon-wrapper">
      <input v-bind="inputAttrs" class="text-field-input" v-on="handlers" />
      <span v-if="$slots.leftIcon" class="text-field-left-icon">
        <slot name="leftIcon" />
      </span>
      <span v-if="$slots.rightIcon" class="text-field-right-icon">
        <slot name="rightIcon" />
      </span>
    </div>
    <AppTypography v-if="isError" class="error" type="error">{{ error }}</AppTypography>
  </div>
</template>

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
