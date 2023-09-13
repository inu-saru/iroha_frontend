import type { Meta, StoryObj } from "@storybook/react"

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
  args: {
    resourceId: "999",
    original: "original text",
    translation: "translated text",
    isLoading: false
  }
}
