<script setup lang="ts">
import { computed } from 'vue'
import { cyrillicRegex, latinRegex } from '../lib'

const props = defineProps<{
  text: string
}>()
const selectedUserLanguage = computed(() => {
  if (latinRegex.test(props.text)) {
    return 'en'
  } else if (cyrillicRegex.test(props.text)) {
    return 'ru'
  }

  return 'ХЗ'
})
</script>
<template>
  <div class="language-wrapper">
    <span>{{ selectedUserLanguage }}</span>
  </div>
</template>
<style scoped>
.language-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 2px;
  text-transform: uppercase;
}
</style>
