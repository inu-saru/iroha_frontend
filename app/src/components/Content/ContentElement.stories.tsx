import type { Meta, StoryObj } from "@storybook/react"

import React from "react"
import { ContentElement } from "./ContentElement"

const meta = {
  title: "Components/Content/ContentElement",
  component: ContentElement,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof ContentElement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <ContentElement resourceId="999" resourceName="resource name" isLoading={false}>
        <p>Content</p>
      </ContentElement>
    )
  }
}
