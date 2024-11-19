<template>
  <TextField
    name="Search Input"
    placeholder="Search..."
    :class="className"
    @input="
      (event) => {
        model = event.currentTarget.value
      }
    "
  >
    <template #leftIcon>
      <IconBase name="sprite/loupe" />
    </template>
  </TextField>
</template>
<script lang="ts" setup="">
import { TextField } from '@/shared/ui/text-field'
import IconBase from '@/shared/ui/icon/IconBase.vue'

const props = defineProps<{
  className: string
}>()
const model = defineModel<string>()
</script>
<style scoped></style>
