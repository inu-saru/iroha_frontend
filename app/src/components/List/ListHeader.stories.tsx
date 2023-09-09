import type { Meta, StoryObj } from "@storybook/react"

import { ListHeader } from "./ListHeader"

const meta = {
  title: "Components/List/ListHeader",
  component: ListHeader,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof ListHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "label"
  }
}
