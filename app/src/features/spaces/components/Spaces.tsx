import { useRef } from "react"
import { useClickAway, useToggle } from "react-use"
import { z } from "zod"

import { Button, Icon } from "@/components/Elements"
import { NavItemCreate, NavHeader, NavItems } from "@/components/Nav"

import { useSpaces } from "../api/getSpaces"
import { DropDownSpace } from "./DropDownSpace"
import { useCreateSpace } from "../api/createSpace"
import { useUpdateSpace } from "../api/updateSpace"
import { ConfirmationDialog } from "@/components/ConfirmationDialog"
import { useDisclosure } from "@/hooks/useDisclosure"
import { useDeleteSpace } from "../api/deleteSpace"

const schema = z.object({
  name: z.string().min(1, "Required")
})

export const Spaces = (): JSX.Element => {
  const spacesQuery = useSpaces()
  const [isOpen, toggle] = useToggle(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    toggle()
  })

  const {
    targetData,
    openWith: openWithDelete,
    closeWith: closeWithDelete,
    isOpen: isOpenDelete
  } = useDisclosure()
  const deleteSpaceMutation = useDeleteSpace({})

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
        schema={schema}
        updateResourceQuery={useUpdateSpace}
        resourcesUrl="spaces"
        icon="space"
        dropDown={<DropDownSpace deleteToggle={openWithDelete} />}
      />
      <ConfirmationDialog
        isOpen={isOpenDelete}
        close={closeWithDelete}
        confirmButton={
          <Button
            onClick={async () => {
              await deleteSpaceMutation.mutateAsync({
                spaceId: targetData.spaceId
              })
              closeWithDelete()
            }}
          >
            削除
          </Button>
        }
        title={"スペースの削除"}
        body={`${targetData.label}を削除しますか？`}
      />
    </>
  )
}
