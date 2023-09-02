import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./Button"

const meta = {
  title: "Components/Elements/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button"
  }
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button"
  }
}

export const Error: Story = {
  args: {
    variant: "error",
    children: "Button"
  }
}
