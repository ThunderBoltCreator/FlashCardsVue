<script setup lang="ts">
import { type AppInputProps, AppTextField } from '@/shared/ui/text-field'
import IconBase from '@/shared/ui/icon/IconBase.vue'
import { ref, computed } from 'vue'

const props = defineProps<Omit<AppInputProps, 'type'>>()

const showPassword = ref(false)
const inputType = computed(() => {
  return showPassword.value ? 'text' : 'password'
})

const changePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>
<template>
  <AppTextField class="field" :type="inputType" v-bind="props">
    <span class="icon" @click="changePasswordVisibility">
      <IconBase v-if="showPassword" name="sprite/eye" />
      <IconBase v-if="!showPassword" name="sprite/close-eye" />
    </span>
  </AppTextField>
</template>
<style scoped>
.icon {
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
