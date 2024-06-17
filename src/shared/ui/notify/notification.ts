import { toast, type ToastOptions } from 'vue3-toastify'

export const notify = (notifyText: string, options?: ToastOptions) => {
  toast(
    notifyText,
    options ??
      ({
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT
      } as ToastOptions)
  )
}
