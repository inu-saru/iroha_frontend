import * as z from "zod"

import { Form, Input } from "@/components/Form"
import { Button } from "@/components/Elements/Button"
import { useLogin } from "@/lib/auth"

const schema = z.object({
  email: z
    .string()
    .email({
      message: "メールアドレスの形式ではありません。"
    })
    .min(1, { message: "1文字以上入力する必要があります。" }),
  password: z.string().min(1, { message: "1文字以上入力する必要があります。" })
})

interface LoginFormProps {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps): JSX.Element => {
  const login = useLogin()

  const onSubmit = (data: any): void => {
    login.mutate(data, {
      onSuccess
    })
  }

  return (
    <div>
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
            <Button className="w-full" type="submit">
              ログイン
            </Button>
          </>
        )}
      </Form>
    </div>
  )
}
