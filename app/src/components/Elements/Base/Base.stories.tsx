import type { Meta, StoryObj } from "@storybook/react"

import { Base } from "./Base"

const meta = {
  title: "Components/Elements/Base",
  component: Base,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Base>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "default",
    children: "Slot"
  }
}

export const Middle: Story = {
  args: {
    size: "middle",
    children: "Slot"
  }
}
