<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import { AppButton } from '@/shared/ui/button'
import { AppTextField } from '@/shared/ui/text-field'
import { AppCheckbox } from '@/shared/ui/checkbox'
import zod, { ZodError } from 'zod'

import { ref } from 'vue'
import { authControllerLogin } from '@/entities/user'

const validateSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, 'Password must be at least 6 characters long'),
  rememberMe: zod.boolean()
})

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

async function submitLoginForm(event: Event) {
  event.preventDefault()

  try {
    const fieldsData = validateSchema.parse(form.value)

    try {
      const res = await authControllerLogin(fieldsData)
      console.log('loginFetchResponse', res)
    } catch (e) {
      console.log('loginFetchError', e)
    }

    console.log(fieldsData)
  } catch (e) {
    const error = e as ZodError
    const flattenError = error.flatten()

    for (const key in flattenError.fieldErrors) {
      console.log(flattenError.fieldErrors[key]?.[0])
    }
  }
}
</script>
<template>
  <section class="card">
    <AppTypography class="title" type="h1">Sign In</AppTypography>
    <form class="form" @submit="submitLoginForm">
      <AppTextField v-model="form.email" type="email" class-name="email-block" label="Email" />
      <AppTextField
        v-model="form.password"
        class-name="password-block"
        label="Password"
        type="password"
      />
      <AppCheckbox v-model="form.rememberMe" class-name="checkbox" label="Remember me" />
      <RouterLink to="/" class="forgot">
        <AppTypography type="body2"> Forgot Password?</AppTypography></RouterLink
      >
      <AppButton class="btn">Sign In</AppButton>
    </form>
    <AppTypography class="question" type="body2">Don't have an account?</AppTypography>
    <RouterLink class="link" to="/register">Sign Up</RouterLink>
  </section>
</template>

<style scoped lang="scss">
.card {
  max-width: 420px;
  margin: 36px auto 0;
  text-align: center;
  background-color: var(--color-dark-700);
  padding: 29px 32px;
}
.title {
  margin-bottom: 27px;
}
.form {
  display: flex;
  flex-direction: column;

  & > .checkbox {
    align-self: flex-start;
  }

  & > .email-block {
    margin-bottom: 24px;
  }

  & > .password-block {
    margin-bottom: 12px;
  }

  & > .btn {
    margin-bottom: 20px;
  }
}

.forgot {
  text-decoration: none;
  align-self: flex-end;
  margin-right: 12px;
  margin-bottom: 66px;
}

.question {
  margin-bottom: 7px;
}

.link {
}
</style>
