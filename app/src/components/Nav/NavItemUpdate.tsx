import { type Schema } from "zod"

import { Form, Icon, Spinner } from "@/components/Elements"
import { type UseMutateAsyncFunction } from "@tanstack/react-query"
import { type AxiosError } from "axios"

interface NavItemUpdateBaseProps {
  mutateAsync: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    any,
    unknown
  >
  isLoading: boolean
  schema?: Schema
  maxLength?: number
}

export interface NavitemUpadteResourceDataProps {
  resourceId?: number
  defaultValue?: string
  placeholder?: string
  toggle?: () => void
}

type NavItemUpdateProps = NavItemUpdateBaseProps &
  NavitemUpadteResourceDataProps

export const NavItemUpdate = ({
  mutateAsync,
  resourceId,
  isLoading,
  schema,
  maxLength = 255,
  defaultValue = "",
  placeholder = "",
  toggle = () => {}
}: NavItemUpdateProps): JSX.Element => {
  const onSubmit = async (data: any): Promise<void> => {
    await mutateAsync({ data, resourceId })
    toggle()
  }
  return (
    <div className="flex items-center pl-2 h-8 bg-primary-20">
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <Icon variant="editActive" className="mr-1" />
      )}
      <div className="w-full pr-2 box-border border-b border-primary-200">
        <Form onSubmit={onSubmit} schema={schema}>
          {({ register, formState }) => (
            <>
              <input
                maxLength={maxLength}
                className="w-full outline-none bg-primary-20 h-8 text-natural-900 text-small placeholder-natural-90 "
                defaultValue={defaultValue}
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
