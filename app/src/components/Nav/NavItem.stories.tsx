import type { Meta, StoryObj } from "@storybook/react"
import { BrowserRouter } from "react-router-dom"

import { NavItem } from "./NavItem"

const meta = {
  title: "Components/Nav/NavItem",
  component: NavItem,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <NavItem label="label" to="/" />
      </BrowserRouter>
    )
  }
}
