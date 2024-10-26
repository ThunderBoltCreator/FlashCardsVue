import { type Meta, type StoryObj } from '@storybook/vue3'

import Button from './Button.vue'
import IconBase from '@/shared/ui/icon/IconBase.vue'

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    disabled: false,
    fullWidth: false,
    style: {}
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Hello Storybook</Button>'
  }),
  args: {}
}

export const Secondary: Story = {
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args" variant="secondary">Hello Storybook</Button>'
  }),
  args: {}
}
export const LeftIcon: Story = {
  render: (args: any) => ({
    components: { Button, IconBase },
    setup() {
      return { args }
    },
    template:
      '<Button v-bind="args">Hello Storybook<template #left-icon><IconBase :style="args.style" name="sprite/edit" /></template></Button>'
  }),
  args: {}
}
export const RightIcon: Story = {
  render: (args: any) => ({
    components: { Button, IconBase },
    setup() {
      return { args }
    },
    template:
      '<Button v-bind="args">Hello Storybook<template #right-icon><IconBase name="sprite/edit" /></template></Button>'
  }),
  args: {}
}
