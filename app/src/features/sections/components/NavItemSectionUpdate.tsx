import { z } from "zod"

import { Form, Icon, Spinner } from "@/components/Elements"
import { NavItem } from "@/components/Nav"

import { useUrlParams } from "@/lib/useUrlParams"
import { useUpdateSection } from "../api/updateSection"
import { useSection } from "../api/getSection"

import { type Section } from "../types"

interface NavItemSectionUpdateProps {
  resource: Section
  toggle: () => void
}

const schema = z.object({
  name: z.string().min(1, "Required")
})

export const NavItemSectionUpdate = ({
  resource,
  toggle
}: NavItemSectionUpdateProps): JSX.Element => {
  const { spaceId, config } = useUrlParams()

  const spaceQuery = useSection({
    spaceId,
    sectionId: resource.id
  })

  const updateSectionMutation = useUpdateSection({
    spaceId,
    config
  })

  const onSubmit = async (data: any): Promise<void> => {
    await updateSectionMutation.mutateAsync({
      data,
      spaceId,
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
          {updateSectionMutation.isLoading ? (
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
