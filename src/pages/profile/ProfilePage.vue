<script setup lang="ts">
import AppCard from '@/shared/ui/card/AppCard.vue'
import { useUserStore } from '@/entities/user'
import { ref } from 'vue'
import ProfileBody from '@/pages/profile/ProfileBody.vue'
import AppButton from '@/shared/ui/button/AppButton.vue'
import IconBase from '@/shared/ui/icon/IconBase.vue'

const userStore = useUserStore()
const editableMod = ref(false)

function changeMod() {
  editableMod.value = !editableMod.value
}
</script>
<template>
  <AppCard class="profile-root">
    <div class="profile-body-wrapper">
      <AppButton type="button" variant="secondary" class="edit-mod" @click="changeMod">
        <IconBase name="sprite/profile" />
      </AppButton>
      <ProfileBody v-if="userStore.user && !editableMod" :user="userStore.user" />
    </div>
  </AppCard>
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
