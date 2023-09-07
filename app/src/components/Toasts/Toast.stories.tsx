import type { Meta, StoryObj } from "@storybook/react"

import { Toast } from "./Toast"

const meta = {
  title: "Components/Toasts/Toast",
  component: Toast,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

const onDismiss = (): void => {}

export const Success: Story = {
  args: {
    toast: {
      id: 1,
      variant: "success",
      title: "title",
      message: "message"
    },
    onDismiss: onDismiss
  }
}

export const Error: Story = {
  args: {
    toast: {
      id: 1,
      variant: "error",
      title: "title",
      message: "message"
    },
    onDismiss: onDismiss
  }
}

export const Alert: Story = {
  args: {
    toast: {
      id: 1,
      variant: "alert",
      title: "title",
      message: "message"
    },
    onDismiss: onDismiss
  }
}
