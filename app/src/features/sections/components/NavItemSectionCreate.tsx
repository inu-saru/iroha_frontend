import { z } from "zod"

import { Form, Icon, Spinner } from "@/components/Elements"
import { NavItem } from "@/components/Nav"

import { useCreateSection } from "../api/createSection"
import { useUrlParams } from "@/lib/useUrlParams"

interface NavItemSectionCreateProps {
  toggle: () => void
}

const schema = z.object({
  name: z.string().min(1, "Required")
})

export const NavItemSectionCreate = ({
  toggle
}: NavItemSectionCreateProps): JSX.Element => {
  const { spaceId } = useUrlParams()
  const createSectionMutation = useCreateSection({ spaceId })

  const onSubmit = async (data: any): Promise<void> => {
    await createSectionMutation.mutateAsync({
      data
    })
    toggle()
  }

  return (
    <>
      <NavItem isEditing={true}>
        <div className="flex items-center px-2">
          {createSectionMutation.isLoading ? (
            <Spinner size="sm" />
          ) : (
            <Icon variant="editActive" className="mr-1" />
          )}
          <Form onSubmit={onSubmit} schema={schema}>
            {({ register, formState }) => (
              <>
                <input
                  maxLength={100}
                  className="w-full outline-none bg-primary-20 h-8 text-natural-900 text-small placeholder-natural-90 "
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
