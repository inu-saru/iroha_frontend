import type { Meta, StoryObj } from "@storybook/react"

import { Chip } from "./Chip"

const meta = {
  title: "Components/Elements/Chip",
  component: Chip,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "default",
    children: "Slot"
  }
}
