<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import { AppButton } from '@/shared/ui/button'
import { AppTextField } from '@/shared/ui/text-field'

import { ref } from 'vue'
const email = ref('')
const password = ref('')
</script>
<template>
  <section class="card">
    <AppTypography class="title" type="h1">Sign In</AppTypography>
    <form>
      <AppTextField v-model="email" type="email" class-name="email-block" label="Email" />
      <AppTextField
        v-model="password"
        class-name="password-block"
        label="Password"
        type="password"
      />
      <div>
        <input type="checkbox" />
        <label>Remember me</label>
      </div>
      <RouterLink to="/" class="forgot">
        <AppTypography type="body2"> Forgot Password?</AppTypography></RouterLink
      >
      <AppButton>Sign In</AppButton>
    </form>
    <AppTypography type="body2">Don't have an account?</AppTypography>
    <RouterLink to="/register">Sign Up</RouterLink>
  </section>
</template>

<style scoped>
.card {
  max-width: 420px;
  margin: 0 auto;
  text-align: center;
  background-color: var(--color-dark-700);
  padding: 29px 32px;
}
.title {
  margin-bottom: 27px;
}
.email-block {
  margin-bottom: 24px;
}
.password-block {
  margin-bottom: 12px;
}
.forgot {
  text-decoration: none;
}
</style>
