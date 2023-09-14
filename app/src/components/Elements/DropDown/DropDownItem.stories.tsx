import type { Meta, StoryObj } from "@storybook/react"

import { DropDownItem } from "./DropDownItem"

const meta = {
  title: "Components/Elements/DropDown/DropDownItem",
  component: DropDownItem,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof DropDownItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "label"
  }
}
