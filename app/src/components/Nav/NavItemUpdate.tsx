import { type Schema } from "zod"

import { Icon, Spinner } from "@/components/Elements"
import { Form } from "@/components/Form"
import { type UseMutationResult } from "@tanstack/react-query"

interface NavItemUpdateProps {
  resourceId?: number
  actionResource: UseMutationResult
  schema?: Schema
  maxLength?: number
  defaultValue?: string
  placeholder?: string
  toggle: () => void
}

export const NavItemUpdate = ({
  resourceId,
  actionResource,
  schema,
  maxLength = 255,
  defaultValue = "",
  placeholder = "",
  toggle
}: NavItemUpdateProps): JSX.Element => {
  const actionResouceMutation = actionResource()
  const onSubmit = async (data: any): Promise<void> => {
    await actionResouceMutation.mutateAsync({ data, resourceId })
    toggle()
  }
  return (
    <div className="flex items-center pl-2 h-8 bg-primary-20">
      {actionResouceMutation.isLoading ? (
        <Spinner />
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
