import type { Meta, StoryObj } from "@storybook/react"

import { Radio } from "./Radio"

const meta = {
  title: "Components/Elements/Radio",
  component: Radio,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "radio group name",
    checked: false
  }
}
