import type { Meta, StoryObj } from "@storybook/react"

import { DropDown } from "./DropDown"
import { Default as DropDownItem } from "./DropDownItem.stories"
import React from "react"

const meta = {
  title: "Components/Elements/DropDown",
  component: DropDown,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <DropDownItem label="ss" />
  }
}
