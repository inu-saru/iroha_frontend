import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import {
  useForm,
  type UseFormReturn,
  type SubmitHandler
} from "react-hook-form"
import { type ZodType, type ZodTypeDef } from "zod"

interface FormProps<TFormValues, Schema> {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
  className?: string
  options?: UseFormProps<TFormValues>
  schema?: Schema
}

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({
  onSubmit,
  children,
  className,
  options,
  schema
}: FormProps<TFormValues, Schema>): JSX.Element => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema != null && zodResolver(schema)
  })
  return (
    <form
      className={clsx("space-y-6", className)}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      {children(methods)}
    </form>
  )
}
