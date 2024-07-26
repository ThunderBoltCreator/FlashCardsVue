<template>
  <component :is="tag" class="typography" :class="className">
    <slot> </slot>
  </component>
</template>
<script setup lang="ts">
import { type IntrinsicElementAttributes } from 'vue'

const props = defineProps<{
  as?: keyof IntrinsicElementAttributes
  type: keyof typeof variants
}>()

const variants = {
  body1: 'p',
  body2: 'p',
  caption: 'span',
  error: 'span',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  large: 'h1',
  link1: 'a',
  link2: 'a',
  overline: 'span',
  subtitle1: 'h5',
  subtitle2: 'h6'
} as const

const tag = props.as ? props.as : variants[props.type]
const className = props.type
</script>

<style scoped>
.typography {
  font-size: var(--font-size-m);
  font-weight: 700;
  line-height: 1.333;
  color: var(--color-light-100);
}
.body1 {
  font-weight: 400;
  line-height: var(--line-height-m);
}
.body2 {
  font-size: var(--font-size-s);
  font-weight: 400;
}
.caption {
  font-size: var(--font-size-xs);
  font-weight: 400;
  line-height: var(--line-height-s);
}
.error {
  line-height: var(--line-height-m);
  color: var(--color-danger-500);
}
.h1 {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-l);
}
.h2 {
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);
}
.h3 {
  line-height: var(--line-height-m);
}
.large {
  font-size: var(--font-size-xxl);
  line-height: var(--line-height-l);
}
.link1 {
  cursor: pointer;
  font-size: var(--font-size-s);
  line-height: var(--line-height-m);
  color: var(--color-info-500);
  text-decoration-line: underline;
}
.link2 {
  cursor: pointer;
  font-size: var(--font-size-xs);
  font-weight: 400;
  line-height: var(--line-height-s);
  color: var(--color-info-500);
  text-decoration-line: underline;
}
.overline {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-s);
}
.subtitle1 {
  line-height: var(--line-height-m);
}
.subtitle2 {
  font-size: var(--font-size-s);
  line-height: var(--line-height-m);
}
</style>
