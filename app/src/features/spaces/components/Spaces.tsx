import { useRef } from "react"
import { useClickAway, useToggle } from "react-use"
import { z } from "zod"

import { Icon } from "@/components/Elements"
import { NavItemCreate, NavHeader, NavItems } from "@/components/Nav"

import { useSpaces } from "../api/getSpaces"
import { DropDownSpace } from "./DropDownSpace"
import { useCreateSpace } from "../api/createSpace"
import { useUpdateSpace } from "../api/updateSpace"

const schema = z.object({
  name: z.string()
})

export const Spaces = (): JSX.Element => {
  const spacesQuery = useSpaces()
  const [isOpen, toggle] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    toggle()
  })

  return (
    <>
      <NavHeader title="スペース">
        <div onClick={toggle}>
          <Icon variant="add" bgColor="white" />
        </div>
      </NavHeader>
      {isOpen && (
        <div ref={ref}>
          <NavItemCreate
            actionResource={useCreateSpace}
            schema={schema}
            placeholder="新しいスペース"
            toggle={toggle}
          />
        </div>
      )}
      <NavItems
        resourcesQuery={spacesQuery}
        updateResourceQuery={useUpdateSpace}
        resourcesUrl="spaces"
        icon="space"
        dropDown={<DropDownSpace />}
      />
    </>
  )
}
