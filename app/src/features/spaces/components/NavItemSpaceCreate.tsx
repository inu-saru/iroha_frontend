import { z } from "zod"

import { Form, Icon, Spinner } from "@/components/Elements"
import { NewNavItem } from "@/components/Nav/NewNavItem"

import { useCreateSpace } from "../api/createSpace"

interface NavItemSpaceCreateProps {
  toggle: () => void
}

const schema = z.object({
  name: z.string().min(1, "Required")
})

export const NavItemSpaceCreate = ({
  toggle
}: NavItemSpaceCreateProps): JSX.Element => {
  const createSpaceMutation = useCreateSpace()

  const onSubmit = async (data: any): Promise<void> => {
    await createSpaceMutation.mutateAsync({
      data
    })
    toggle()
  }

  return (
    <>
      <NewNavItem isEditing={true}>
        <div className="flex items-center px-2">
          {createSpaceMutation.isLoading ? (
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
      </NewNavItem>
    </>
  )
}
