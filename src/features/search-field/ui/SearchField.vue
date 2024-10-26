<script lang="ts" setup="">
import { TextField } from '@/shared/ui/text-field'
import IconBase from '@/shared/ui/icon/IconBase.vue'

const model = defineModel<string>()
const props = defineProps<{
  className: string
}>()
</script>
<template>
  <TextField
    :is-form-input="true"
    name="Search Input"
    placeholder="Search..."
    class="search"
    @change="(modelValue) => console.log(modelValue)"
  >
    <template #leftIcon>
      <IconBase name="sprite/loupe" />
    </template>
  </TextField>
</template>
<style></style>
