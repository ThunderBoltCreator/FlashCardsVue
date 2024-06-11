import { reactive } from 'vue'

export const userModel = reactive({
  authorization: false,
  setAuthorization(value: boolean) {
    this.authorization = value
  }
})
