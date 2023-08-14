import { z } from "zod"
import { type UseMutationResult } from "@tanstack/react-query"
import { type AxiosError } from "axios"

import { NavItemCreate } from "@/components/Nav"

const schema = z.object({
  name: z.string().min(1, "Required")
})

interface NavItemCreateSectionProps {
  createSectionMutation: UseMutationResult<
    any,
    AxiosError<unknown, any>,
    any,
    unknown
  >
  toggle?: () => void
}

export const NavItemCreateSection = ({
  createSectionMutation,
  toggle = () => {}
}: NavItemCreateSectionProps): JSX.Element => {
  return (
    <>
      <NavItemCreate
        createResourceMutation={createSectionMutation}
        schema={schema}
        maxLength={255}
        placeholder="新しいセクション"
        toggle={toggle}
      />
    </>
  )
}
