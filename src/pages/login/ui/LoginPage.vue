<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import { AppButton } from '@/shared/ui/button'
import { AppTextField } from '@/shared/ui/text-field'
import { AppCheckbox } from '@/shared/ui/checkbox'
import { useForm } from 'vee-validate'
import zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { login } from '@/pages/login/model/login-page-model.ts'
import { toast } from 'vue3-toastify'

const validateSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, 'Password must be at least 6 characters long'),
  rememberMe: zod.boolean()
})

type FormFields = zod.infer<typeof validateSchema>
const { handleSubmit } = useForm<FormFields>({
  validationSchema: toTypedSchema(validateSchema)
})

const onSubmit = handleSubmit(async (values: FormFields) => {
  console.log('submit')
  const loginResponse = await login(values)

  if (loginResponse.errorMessage) {
    toast.error(loginResponse.errorMessage)
  } else if (loginResponse.message) {
    toast.success(loginResponse.message)
  }
})
</script>
<template>
  <section class="card">
    <AppTypography class="title" type="h1">Sign In</AppTypography>
    <form novalidate class="form" @submit="onSubmit">
      <AppTextField name="email" type="email" class-name="email-block" label="Email" />
      <AppTextField name="password" class-name="password-block" label="Password" type="password" />
      <AppCheckbox name="rememberMe" class-name="checkbox" label="Remember me" />
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
