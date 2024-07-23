import { notify } from '@/shared/ui/notify/notification.ts'
import { type ToastType } from 'vue3-toastify'

export type ResponseFromModel = {
  message: string
  type: ToastType
}

export const showToastWithModelResponse = (response: ResponseFromModel) => {
  return notify(response.message, { type: response.type })
}
