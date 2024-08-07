<script setup lang="ts">
import AppCard from '@/shared/ui/card/AppCard.vue'
import { useUserStore } from '@/entities/user'
import { ref } from 'vue'
import ProfileBody from '@/pages/profile/ProfileBody.vue'
import AppButton from '@/shared/ui/button/AppButton.vue'
import IconBase from '@/shared/ui/icon/IconBase.vue'
import EditableProfile from '@/pages/profile/EditableProfile.vue'
import FullPageSpinner from '@/shared/ui/spinner/FullPageSpinner.vue'
import { showToastWithModelResponse } from '@/shared/lib/notifications.ts'
import { useMyFetch } from '@/shared/lib/use-my-fetch.ts'

const isLoading = ref(false)
const editableMod = ref(false)

const userStore = useUserStore()

function changeMod() {
  editableMod.value = !editableMod.value
}

async function handleLogout() {
  const res = await useMyFetch(userStore.logout, isLoading)

  showToastWithModelResponse(res)
}
</script>
<template>
  <AppCard class="profile-root">
    <div class="profile-body-wrapper">
      <AppButton
        v-if="!editableMod"
        type="button"
        variant="secondary"
        class="edit-mod"
        @click="changeMod"
      >
        <IconBase name="sprite/edit" />
      </AppButton>
      <ProfileBody v-if="!editableMod" :user="userStore.user!" @logout="handleLogout" />
      <EditableProfile v-else @change-mod="changeMod" />
    </div>
  </AppCard>
  <FullPageSpinner v-if="isLoading" />
</template>
<style scoped>
.profile-root {
  padding: 33px 80px;
  max-width: 420px;
  margin: 36px auto 0;
}
.profile-body-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.edit-mod {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
}
</style>
