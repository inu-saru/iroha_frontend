import { z } from "zod"

import { Form, Icon, Spinner } from "@/components/Elements"
import { NavItem } from "@/components/Nav"

import { useUrlParams } from "@/lib/useUrlParams"
import { useUpdateSpace } from "../api/updateSpace"
import { useSpace } from "../api/getSpace"

import { type Space } from "../types"

interface NavItemSpaceUpdateProps {
  resource: Space
  toggle: () => void
}

const schema = z.object({
  name: z.string().min(1, "Required")
})

export const NavItemSpaceUpdate = ({
  resource,
  toggle
}: NavItemSpaceUpdateProps): JSX.Element => {
  const { config } = useUrlParams()

  const spaceQuery = useSpace({
    spaceId: resource.id
  })

  const updateSpaceMutation = useUpdateSpace({
    config
  })

  const onSubmit = async (data: any): Promise<void> => {
    await updateSpaceMutation.mutateAsync({
      data,
      resourceId: resource.id
    })
    toggle()
  }

  if (spaceQuery.isLoading) {
    return (
      <div className="py-4 w-full flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    )
  }

  return (
    <>
      <NavItem isEditing={true}>
        <div className="flex items-center px-2">
          {updateSpaceMutation.isLoading ? (
            <Spinner size="sm" />
          ) : (
            <Icon variant="editActive" className="mr-1" />
          )}
          <Form onSubmit={onSubmit} schema={schema} className="w-full">
            {({ register, formState }) => (
              <>
                <input
                  maxLength={100}
                  className="w-full outline-none bg-primary-20 h-8 text-natural-900 text-small placeholder-natural-90 "
                  defaultValue={resource.name}
                  placeholder={"入力してください"}
                  {...register("name")}
                />
              </>
            )}
          </Form>
        </div>
      </NavItem>
    </>
  )
}
