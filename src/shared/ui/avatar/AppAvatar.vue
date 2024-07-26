<script setup lang="ts">
import { AvatarRoot, AvatarFallback, AvatarImage } from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{
  fallbackSrc?: string
  imgSrc?: string
  size: 'mini' | 'maxi'
}>()
const image = computed(() => {
  return props.imgSrc ?? ''
})
const fallback = props.fallbackSrc ?? '/avatar-fallback.png'
</script>
<template>
  <AvatarRoot class="avatar" :class="[props.size]">
    <AvatarImage :src="image" />
    <AvatarFallback class="avatar-fallback">
      <img :src="fallback" alt="fallback" />
    </AvatarFallback>
  </AvatarRoot>
</template>
<style scoped>
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
}
.avatar-fallback {
  display: block;
  border-radius: 50%;
  overflow: hidden;
}
.mini img {
  width: 36px;
  height: 36px;
}
.maxi img {
  width: 96px;
  height: 96px;
}
</style>
