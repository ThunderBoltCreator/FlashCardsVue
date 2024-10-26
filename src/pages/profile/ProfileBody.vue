<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import AppAvatar from '@/shared/ui/avatar/AppAvatar.vue'
import IconBase from '@/shared/ui/icon/IconBase.vue'
import AppTypography from '@/shared/ui/typography/AppTypography.vue'
import { type User } from '@/entities/user'

const props = defineProps<{
  user: User
}>()
defineEmits<{
  (e: 'logout'): void
}>()
</script>
<template>
  <AppTypography type="h1" class="title">Profile</AppTypography>
  <AppAvatar size="maxi" :img-src="props.user.avatar" class="avatar" />
  <AppTypography type="h2">{{ props.user.name }}</AppTypography>
  <AppTypography class="email" type="body2">{{ props.user.email }}</AppTypography>
  <Button type="button" variant="secondary" class="logout-button" @click="$emit('logout')">
    <IconBase name="sprite/log-out" />
    <AppTypography type="subtitle2">Logout</AppTypography>
  </Button>
</template>
<style scoped>
.title {
  margin-bottom: 27px;
}
.avatar {
  margin-bottom: 6px;
}
.email {
  margin-bottom: 13px;
}
.logout-button {
  gap: 6px;
}
</style>
