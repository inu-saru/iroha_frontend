import type { Meta, StoryObj } from "@storybook/react"

import { Spinner } from "./Spinner"

const meta = {
  title: "Components/Elements/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Md: Story = {
  args: {
    size: "md"
  }
}
