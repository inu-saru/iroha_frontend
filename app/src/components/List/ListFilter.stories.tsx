import type { Meta, StoryObj } from "@storybook/react"

import { ListFilter } from "./ListFilter"
import { Icon } from "../Elements"

const meta = {
  title: "Components/List/ListFilter",
  component: ListFilter,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof ListFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    setSearchParams: (): void => {}
  }
}
