<script setup lang="ts">
import { AppTypography } from '@/shared/ui/typography'
import { AppButton } from '@/shared/ui/button'
import { AppTextField } from '@/shared/ui/text-field'
import { AppCheckbox } from '@/shared/ui/checkbox'
import { useForm } from 'vee-validate'
import zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import PasswordField from '@/widgets/password-field/PasswordField.vue'
import AppCard from '@/shared/ui/card/AppCard.vue'
import { useUserStore } from '@/entities/user/model/user-model.ts'
import FullPageSpinner from '@/shared/ui/spinner/FullPageSpinner.vue'
import { showToastWithModelResponse } from '@/shared/lib/notifications.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMyFetch } from '@/shared/lib/use-my-fetch.ts'

const router = useRouter()
const userStore = useUserStore()
const isLoading = ref(false)

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
  const res = await useMyFetch(userStore.login.bind(null, values), isLoading)
  if (res.type === 'success') {
    await router.push('/')
  }
  showToastWithModelResponse(res)
})
</script>
<template>
  <AppCard as="section" class="card">
    <AppTypography class="title" type="h1">Sign In</AppTypography>
    <form novalidate class="form" @submit="onSubmit">
      <AppTextField name="email" type="email" class-name="email-block" label="Email" />
      <PasswordField name="password" class-name="password-block" label="Password" />
      <AppCheckbox name="rememberMe" class-name="checkbox" label="Remember me" />
      <RouterLink to="/" class="forgot">
        <AppTypography type="body2"> Forgot Password?</AppTypography></RouterLink
      >
      <AppButton class="btn">Sign In</AppButton>
    </form>
    <AppTypography class="question" type="body2">Don't have an account?</AppTypography>
    <RouterLink class="link" to="/register">Sign Up</RouterLink>
  </AppCard>
  <FullPageSpinner v-if="isLoading" />
</template>

<style scoped lang="scss">
.card {
  max-width: 420px;
  margin: 36px auto 0;
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
</style>
