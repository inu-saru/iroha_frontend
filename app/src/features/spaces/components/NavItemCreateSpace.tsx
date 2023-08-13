import { z } from "zod"
import { type UseMutationResult } from "@tanstack/react-query"
import { type AxiosError } from "axios"

import { NavItemCreate } from "@/components/Nav"

const schema = z.object({
  name: z.string().min(1, "Required")
})

interface NavItemCreateSpaceProps {
  createSpaceMutation: UseMutationResult<
    any,
    AxiosError<unknown, any>,
    any,
    unknown
  >
  toggle?: () => void
}

export const NavItemCreateSpace = ({
  createSpaceMutation,
  toggle = () => {}
}: NavItemCreateSpaceProps): JSX.Element => {
  return (
    <>
      <NavItemCreate
        createResourceMutation={createSpaceMutation}
        schema={schema}
        maxLength={255}
        placeholder="新しいスペース"
        toggle={toggle}
      />
    </>
  )
}
