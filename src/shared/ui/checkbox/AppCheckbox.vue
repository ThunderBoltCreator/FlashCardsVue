<script setup lang="ts">
import { CheckboxRoot, CheckboxIndicator, Label } from 'radix-vue'
import { AppTypography } from '@/shared/ui/typography'
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps<{
  label?: string
  className?: string
  name: string
  value?: boolean
}>()

defineOptions({
  inheritAttrs: false
})

const name = toRef(props, 'name')

const { value, handleChange } = useField(name, undefined, {
  initialValue: props.value,
  type: 'checkbox'
})
</script>
<template>
  <Label as-child class="checkbox-root" :class="className">
    <AppTypography type="body2" class="label" as="label">
      <CheckboxRoot
        :value="name"
        :checked="value"
        :name="name"
        v-bind="$attrs"
        class="checkbox"
        @update:checked="handleChange"
      >
        <div class="frame" />
        <CheckboxIndicator v-if="value" class="indicator">
          <svg
            fill="none"
            height="18"
            viewBox="0 0 18 18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0H2a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V2a2 2 0 00-2-2zM7 14L2 9l1.41-1.41L7 11.17l7.59-7.59L16 5l-9 9z"
              fill="#FFF"
            />
          </svg>
        </CheckboxIndicator>
      </CheckboxRoot>
      {{ label }}
    </AppTypography>
  </Label>
</template>

<style>
.checkbox-root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.label {
  cursor: pointer;
  display: inline-flex;
  column-gap: 10px;
  align-items: center;
}

.frame {
  position: absolute;
  z-index: 5;
  inset: 0;

  border: 2px solid var(--color-light-900);
  border-radius: 2px;
}

.label > .checkbox {
  all: unset;

  cursor: pointer;

  position: relative;

  width: 18px;
  height: 18px;

  &::before,
  &::after {
    content: '';

    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);

    display: block;

    width: 36px;
    height: 36px;

    border-radius: 50%;

    transition: 0.3s;
  }

  &:disabled {
    .frame {
      border-color: var(--color-dark-100);
    }
  }

  &[data-state='checked']:disabled {
    .frame {
      fill: var(--color-dark-100);
    }
  }

  &:hover {
    &::after {
      transform: translate(-50%, -50%) scale(1);
      background-color: var(--color-dark-500);
    }
  }

  &:focus {
    &::after {
      transform: translate(-50%, -50%) scale(1);
      background-color: var(--color-dark-500);
    }
  }

  &:active {
    &::after {
      transform: translate(-50%, -50%) scale(1);
      background-color: var(--color-dark-100);
      transition: 0s;
    }
  }
}

.indicator {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  fill: var(--color-light-100);
}

.disabled {
  pointer-events: none;
  cursor: initial;
}
</style>
