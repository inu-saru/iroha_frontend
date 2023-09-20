import type { Meta, StoryObj } from "@storybook/react"

import { NavItemCreate } from "./NavItemCreate"

const meta = {
  title: "Components/Nav/NavItemCreate",
  component: NavItemCreate,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof NavItemCreate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoading: false,
    toggle: () => {}
  }
}
