<script setup lang="ts">
import AppTypography from '@/shared/ui/typography/AppTypography.vue'
import AppAvatar from '@/shared/ui/avatar/AppAvatar.vue'
import AppButton from '@/shared/ui/button/AppButton.vue'
import IconBase from '@/shared/ui/icon/IconBase.vue'
import { computed, ref } from 'vue'
import { z, ZodError } from 'zod'
import { ACCEPTED_IMAGES_FORMATS, IMAGE_MAX_SIZE } from '@/shared/config/const'
import { notify } from '@/shared/ui/notify/notification.ts'

defineEmits<{
  (e: 'changeMod'): void
}>()

const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= IMAGE_MAX_SIZE,
    `Max image size is 1MB. The file will not be uploaded.`
  )
  .refine(
    (file) => ACCEPTED_IMAGES_FORMATS.includes(file.type),
    'Only .jpg, .jpeg, .png, .svg and .webp formats are supported. The file will not be uploaded.'
  )

const uploadedPhoto = ref<File | null>(null)
const input = ref<HTMLInputElement | null>(null)

function uploadPhoto(event: Event) {
  const el = event.target as HTMLInputElement
  try {
    uploadedPhoto.value = imageSchema.parse(el.files?.[0])
  } catch (e) {
    const error = e as ZodError

    notify(error.errors[0].message, {
      type: 'error'
    })
  }
}

const photoPreview = computed(() => {
  const photo = uploadedPhoto.value
  if (photo) {
    return URL.createObjectURL(photo)
  }

  return '/photo-plug.jpg'
})
</script>
<template>
  <AppTypography type="h1">Edit Profile</AppTypography>
  <!--  Превью фото + кнопка смены фото  -->
  <div>
    <AppAvatar size="maxi" :img-src="photoPreview" />
    <input ref="input" accept="image/*" type="file" name="" class="input" @change="uploadPhoto" />
    <AppButton type="button" variant="secondary" class="edit-button" @click="input?.click()">
      <IconBase name="sprite/edit" />
    </AppButton>
  </div>

  <!--  Смена ника  -->
  <!--  Сохранить изменения  -->
  <div class="actions">
    <AppButton type="button" variant="secondary" class="back-button" @click="$emit('changeMod')"
      ><IconBase name="sprite/arrow-back"
    /></AppButton>
    <AppButton type="button">Save</AppButton>
  </div>
</template>
<style scoped>
.edit-button {
  padding: 4px;
}
.input {
  position: absolute;

  overflow: hidden;

  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;

  clip: rect(0 0 0 0);
  border: 0;
}
.actions {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}
.back-button {
  padding: 7px;
}
</style>