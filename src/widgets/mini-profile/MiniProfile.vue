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
  DropdownMenuPortal,
  AvatarRoot,
  AvatarImage,
  AvatarFallback
} from 'radix-vue'
import IconBase from '@/shared/ui/icon/IconBase.vue'

const user = useUserStore()
</script>
<template>
  <div class="root">
    <AppTypography type="subtitle1">
      <RouterLink to="/profile">{{ user.user?.name }}</RouterLink>
    </AppTypography>
    <DropdownMenuRoot class="root-menu">
      <DropdownMenuTrigger class="dropdown-trigger">
        <AvatarRoot>
          <AvatarImage src="user.user?.avatar" />
          <AvatarFallback class="avatar-fallback">
            <img src="/avatar-fallback.png" alt="fallback" />
          </AvatarFallback>
        </AvatarRoot>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent :side-offset="10" align="end" class="menu">
          <DropdownMenuArrow class="arrow" />
          <DropdownMenuItem class="menu-item no-scale">
            <AvatarRoot>
              <AvatarImage src="user.user?.avatar" />
              <AvatarFallback class="avatar-fallback">
                <img src="/avatar-fallback.png" alt="fallback" />
              </AvatarFallback>
            </AvatarRoot>
            <div>
              <AppTypography type="subtitle2">{{ user.user?.name }}</AppTypography>
              <AppTypography type="caption">{{ user.user?.email }}</AppTypography>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator class="separator" />
          <DropdownMenuItem as-child>
            <RouterLink class="profile-link menu-item" to="/profile">
              <IconBase name="sprite/profile" />
              <AppTypography type="caption"> My Profile </AppTypography>
            </RouterLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator class="separator" />
          <DropdownMenuItem as-child>
            <button class="menu-item logout-button">
              <IconBase name="sprite/log-out" />
              <AppTypography type="caption">Sign Out</AppTypography>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  </div>
</template>
<style>
.root {
  display: flex;
  align-items: center;
  gap: 12px;
}
.arrow {
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
.dropdown-trigger {
  background-color: transparent;
  cursor: pointer;
}
.menu-item.no-scale {
  transform: none !important;
  cursor: default;
}
.avatar-fallback {
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar-fallback img {
  width: 100%;
}
.menu {
  padding: 12px;
  background-color: var(--color-dark-700);
  border: 1px solid var(--color-dark-500);
  border-radius: 1px;
  color: var(--color-light-100);
}
.menu-item {
  transition: 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.menu-item:hover {
  transform: scale(1.05);
  color: var(--color-light-500);
}
.separator {
  height: 1px;
  background-color: var(--color-dark-500);
  margin: 12px 0;
}
.logout-button {
  background-color: transparent;
  cursor: pointer;
}
</style>
