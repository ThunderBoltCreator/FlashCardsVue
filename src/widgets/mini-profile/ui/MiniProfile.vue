<script setup lang="ts">
import AppTypography from '@/shared/ui/typography/AppTypography.vue'
import { useUserStore } from '@/entities/user'
import { RouterLink } from 'vue-router'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuArrow,
  DropdownMenuPortal
} from 'radix-vue'
import IconBase from '@/shared/ui/icon/IconBase.vue'
import AppAvatar from '@/shared/ui/avatar/AppAvatar.vue'
import { ref } from 'vue'
import { showToastWithModelResponse } from '@/shared/lib/notifications.ts'
import FullPageSpinner from '@/app/App.vue'

const isLoading = ref(false)
const userStore = useUserStore()

async function handleLogout() {
  isLoading.value = true
  const res = await userStore.logout()
  showToastWithModelResponse(res)
  isLoading.value = false
}
</script>
<template>
  <div class="mini-profile-root">
    <AppTypography type="subtitle1">
      <RouterLink to="/profile">{{ userStore.user?.name }}</RouterLink>
    </AppTypography>
    <DropdownMenuRoot class="radix-root-menu">
      <DropdownMenuTrigger class="radix-dropdown-trigger">
        <AppAvatar size="mini" :img-src="userStore.user?.avatar" />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent :side-offset="10" align="end" class="radix-menu">
          <DropdownMenuArrow class="radix-arrow" />
          <DropdownMenuItem class="radix-menu-item no-scale">
            <AppAvatar size="mini" :img-src="userStore.user?.avatar" />
            <div>
              <AppTypography type="subtitle2">{{ userStore.user?.name }}</AppTypography>
              <AppTypography type="caption">{{ userStore.user?.email }}</AppTypography>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator class="radix-separator" />
          <DropdownMenuItem as-child>
            <RouterLink class="profile-link radix-menu-item" to="/profile">
              <IconBase name="sprite/profile" />
              <AppTypography type="caption"> My Profile </AppTypography>
            </RouterLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator class="radix-separator" />
          <DropdownMenuItem as-child>
            <button class="radix-menu-item logout-button" @click.prevent="handleLogout">
              <IconBase name="sprite/log-out" />
              <AppTypography type="caption">Sign Out</AppTypography>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </div>
  <FullPageSpinner v-if="isLoading" />
</template>
<style>
.mini-profile-root {
  display: flex;
  align-items: center;
  gap: 12px;
}
.radix-arrow {
  position: absolute;
  top: -0.26rem;
  right: -10%;
  transform: rotate(45deg);

  width: 0.5rem;
  height: 0.5rem;

  visibility: visible;
  background-color: var(--color-dark-700);
  border: 1px solid var(--color-dark-500);
  border-top: none;
  border-left: none;

  fill: var(--color-dark-700);
}
.radix-dropdown-trigger {
  background-color: transparent;
  cursor: pointer;
}
.radix-menu-item.no-scale {
  transform: none !important;
  cursor: default;
}

.avatar-fallback img {
  width: 100%;
}
.radix-menu {
  padding: 12px;
  background-color: var(--color-dark-700);
  border: 1px solid var(--color-dark-500);
  border-radius: 1px;
  color: var(--color-light-100);
}
.radix-menu-item {
  transition: 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.radix-menu-item:hover {
  transform: scale(1.05);
  color: var(--color-light-500);
}
.radix-separator {
  height: 1px;
  background-color: var(--color-dark-500);
  margin: 12px 0;
}
.logout-button {
  background-color: transparent;
  cursor: pointer;
}
</style>
