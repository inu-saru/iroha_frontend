import { type Schema } from "zod"

import { Icon, Spinner } from "@/components/Elements"
import { Form } from "@/components/Form"

interface NavItemCreateProps {
  actionResource: () => void
  schema?: Schema
  placeholder?: string
  toggle: () => void
}

export const NavItemCreate = ({
  actionResource,
  schema,
  placeholder = "",
  toggle
}: NavItemCreateProps): JSX.Element => {
  const actionResouceMutation = actionResource()
  const onSubmit = async (data: any): Promise<void> => {
    await actionResouceMutation.mutateAsync({
      data
    })
    toggle()
  }
  return (
    <div className="flex items-center pl-2 h-8 bg-primary-20">
      {actionResouceMutation.isLoading ? (
        <Spinner />
      ) : (
        <Icon variant="addActive" className="mr-1" />
      )}
      <div className="w-full pr-2 box-border border-b border-primary-200">
        <Form onSubmit={onSubmit} schema={schema}>
          {({ register, formState }) => (
            <>
              <input
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
