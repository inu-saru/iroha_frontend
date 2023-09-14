import type { Meta, StoryObj } from "@storybook/react"
import { BrowserRouter } from "react-router-dom"

import { ContentHeader } from "./ContentHeader"

const meta = {
  title: "Components/Content/ContentHeader",
  component: ContentHeader,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof ContentHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <ContentHeader to="/" />
      </BrowserRouter>
    )
  }
}
