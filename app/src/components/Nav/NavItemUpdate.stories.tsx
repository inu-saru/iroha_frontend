import type { Meta, StoryObj } from "@storybook/react"

import { NavItemUpdate } from "./NavItemUpdate"

const meta = {
  title: "Components/Nav/NavItemUpdate",
  component: NavItemUpdate,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof NavItemUpdate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoading: false,
    toggle: () => {}
  }
}
