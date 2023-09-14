import type { Meta, StoryObj } from "@storybook/react"
import { BrowserRouter } from "react-router-dom"

import { Link } from "./Link"

const meta = {
  title: "Components/Elements/Link",
  component: Link,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <Link to="/">Link Text</Link>
      </BrowserRouter>
    )
  }
}
