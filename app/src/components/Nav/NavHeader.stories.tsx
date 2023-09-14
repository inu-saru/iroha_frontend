import type { Meta, StoryObj } from "@storybook/react"

import { NavHeader } from "./NavHeader"
import { Icon } from "../Elements"

const meta = {
  title: "Components/Nav/NavHeader",
  component: NavHeader,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof NavHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "resource name",
    children: <Icon variant="add" />
  }
}
