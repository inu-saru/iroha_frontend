import { type Schema } from "zod"

import { Form, Icon, Spinner } from "@/components/Elements"
import { type UseMutateAsyncFunction } from "@tanstack/react-query"
import { type AxiosError } from "axios"

interface NavItemCreateProps {
  mutateAsync: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    any,
    unknown
  >
  isLoading: boolean
  schema?: Schema
  maxLength?: number
  placeholder?: string
  toggle: () => void
}

export const NavItemCreate = ({
  mutateAsync,
  isLoading,
  schema,
  maxLength = 255,
  placeholder = "",
  toggle
}: NavItemCreateProps): JSX.Element => {
  const onSubmit = async (data: any): Promise<void> => {
    await mutateAsync({ data })
    toggle()
  }
  return (
    <div className="flex items-center pl-2 h-8 bg-primary-20">
      {isLoading ? <Spinner /> : <Icon variant="addActive" className="mr-1" />}
      <div className="w-full pr-2 box-border border-b border-primary-200">
        <Form onSubmit={onSubmit} schema={schema}>
          {({ register, formState }) => (
            <>
              <input
                maxLength={maxLength}
                className="w-full outline-none bg-primary-20 h-8 text-natural-900 text-small placeholder-natural-90 "
                placeholder={placeholder}
                {...register("name")}
              />
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
