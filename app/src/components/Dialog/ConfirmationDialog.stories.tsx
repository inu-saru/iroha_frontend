import type { Meta, StoryObj } from "@storybook/react"

import { ConfirmationDialog } from "./ConfirmationDialog"
import { Button, SwitcherDialog } from "../Elements"

const meta = {
  title: "Components/Dialog/ConfirmationDialog",
  component: ConfirmationDialog,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof ConfirmationDialog>

export default meta
type Story = StoryObj<typeof meta>

const onSubmit = (): void => {}

export const Default: Story = {
  render: () => {
    return (
      <SwitcherDialog>
        {(methods) => (
          <>
            <Button onClick={methods.openWith}>triger</Button>
            <ConfirmationDialog
              isOpen={methods.isOpen}
              close={methods.closeWith}
              confirmButton={<Button onClick={onSubmit}>onSubmit</Button>}
              title={"title"}
              body={`message`}
            />
          </>
        )}
      </SwitcherDialog>
    )
  }
}
