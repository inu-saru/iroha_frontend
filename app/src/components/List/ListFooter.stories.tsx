import type { Meta, StoryObj } from "@storybook/react"

import { ListFooter } from "./ListFooter"

const meta = {
  title: "Components/List/ListFooter",
  component: ListFooter,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof ListFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: "999",
    isLoading: false
  }
}
