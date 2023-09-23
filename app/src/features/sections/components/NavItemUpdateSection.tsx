import { z } from "zod"
import { type UseMutationResult } from "@tanstack/react-query"
import { type AxiosError } from "axios"

import { NavItemUpdate } from "@/components/Nav"

const schema = z.object({
  name: z.string().min(1, "Required")
})

interface NavItemUpdateSectionProps {
  updateSectionMutation: UseMutationResult<
    any,
    AxiosError<unknown, any>,
    any,
    unknown
  >
  resourceId?: number
  defaultValue?: string
  placeholder?: string
  toggle?: () => void
}

export const NavItemUpdateSection = ({
  updateSectionMutation,
  resourceId,
  defaultValue = "",
  toggle = () => {}
}: NavItemUpdateSectionProps): JSX.Element => {
  return (
    <>
      <NavItemUpdate
        mutateAsync={updateSectionMutation.mutateAsync}
        isLoading={updateSectionMutation.isLoading}
        schema={schema}
        maxLength={255}
        resourceId={resourceId}
        defaultValue={defaultValue}
        toggle={toggle}
      />
    </>
  )
}
