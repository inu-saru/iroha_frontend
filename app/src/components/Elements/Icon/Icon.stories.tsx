import type { Meta, StoryObj } from "@storybook/react"

import { Icon } from "./Icon"

const meta = {
  title: "Components/Elements/Icon",
  component: Icon,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default"
  }
}

export const Search: Story = {
  args: {
    variant: "search"
  }
}

export const ALl: Story = {
  args: {
    variant: "all"
  }
}

export const AddActive: Story = {
  args: {
    variant: "addActive"
  }
}

export const Add: Story = {
  args: {
    variant: "add"
  }
}

export const ArrowLeft: Story = {
  args: {
    variant: "arrowLeft"
  }
}

export const ArrowDown: Story = {
  args: {
    variant: "arrowDown"
  }
}

export const ArrowRight: Story = {
  args: {
    variant: "arrowRight"
  }
}

export const ArrowUp: Story = {
  args: {
    variant: "arrowUp"
  }
}

export const Close: Story = {
  args: {
    variant: "close"
  }
}

export const EditActive: Story = {
  args: {
    variant: "editActive"
  }
}

export const EditStory: Story = {
  args: {
    variant: "edit"
  }
}

export const MoreHoriz: Story = {
  args: {
    variant: "moreHoriz"
  }
}

export const Pending: Story = {
  args: {
    variant: "pending"
  }
}

export const Section: Story = {
  args: {
    variant: "section"
  }
}

export const SortDesc: Story = {
  args: {
    variant: "sortDesc"
  }
}

export const Space: Story = {
  args: {
    variant: "space"
  }
}
