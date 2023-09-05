import type { Meta, StoryObj } from "@storybook/react"

import { Form } from "./Form"
import { Input } from "./Input"
import * as z from "zod"
import { Button } from "../Button/Button"

const meta = {
  title: "Components/Elements/Form/Form",
  component: Form,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {}
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

const schema = z.object({
  email: z
    .string()
    .email({
      message: "メールアドレスの形式ではありません。"
    })
    .min(1, { message: "1文字以上入力する必要があります。" }),
  password: z.string().min(1, { message: "1文字以上入力する必要があります。" }),
  text: z.string()
})

const onSubmit = (): void => {}

export const Default: Story = {
  render: () => {
    return (
      <Form onSubmit={onSubmit} schema={schema}>
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="メールアドレス"
              error={formState.errors.email}
              registration={register("email")}
            />
            <Input
              type="password"
              label="パスワード"
              error={formState.errors.password}
              registration={register("password")}
            />
            <Input
              type="text"
              label="テキスト"
              error={formState.errors.text}
              registration={register("text")}
            />
            <Button className="w-full" type="submit" isLoading={false}>
              submit
            </Button>
          </>
        )}
      </Form>
    )
  }
}
