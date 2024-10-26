import type { Meta, StoryObj } from '@storybook/vue3'
import TextField from './TextField.vue'

const meta: Meta<typeof TextField> = {
  component: TextField,
  args: {
    type: 'text'
  },
  argTypes: {
    type: {
      options: ['text', 'password', 'email'],
      control: 'inline-radio'
    }
  }
}

export default meta
type Story = StoryObj<typeof TextField>

export const Base: Story = {
  render: (args: any) => ({
    components: { TextField },
    setup() {
      return { args }
    },
    template: '<TextField label="Story" v-bind="args" />'
  }),
  args: {
    label: 'Hello Storybook',
    modelValue: 'Hello Storybook'
  }
}
