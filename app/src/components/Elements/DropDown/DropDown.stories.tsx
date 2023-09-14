import type { Meta, StoryObj } from "@storybook/react"

import { DropDown } from "./DropDown"
import { DropDownItem } from "./DropDownItem"
import { Icon } from "../Icon/Icon"
import React from "react"

const meta = {
  title: "Components/Elements/DropDown/DropDown",
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
  render: () => {
    return (
      <div className="h-40">
        <DropDown trigger={<Icon variant="moreHoriz" />}>
          <DropDownItem label="Item1" />
          <DropDownItem label="Item2" />
        </DropDown>
      </div>
    )
  }
}
