import { z } from "zod"

import { Button, Icon, SwitcherDisplay } from "@/components/Elements"
import { NavHeader, NavItems, NavItemUpdate } from "@/components/Nav"
import { NavItemCreateSpace } from "./NavItemCreateSpace"

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
  const {
    targetData,
    openWith: openWithDelete,
    closeWith: closeWithDelete,
    isOpen: isOpenDelete
  } = useDisclosure()
  const createSpaceMutation = useCreateSpace()
  const updateSpaceMutation = useUpdateSpace()
  const deleteSpaceMutation = useDeleteSpace()

  const resourcesUrl = (resourceId: string): string => {
    return `/app/spaces/${resourceId}/vocabularies`
  }

  return (
    <>
      <SwitcherDisplay>
        {(methods) => (
          <>
            <NavHeader title="スペース">
              <div onClick={methods.toggle}>
                <Icon variant="add" bgColor="white" />
              </div>
            </NavHeader>
            {methods.isOpen && (
              <div ref={methods.clickAway}>
                <NavItemCreateSpace
                  createSpaceMutation={createSpaceMutation}
                  toggle={methods.toggle}
                />
              </div>
            )}
          </>
        )}
      </SwitcherDisplay>
      <NavItems
        resourcesQuery={spacesQuery}
        navItemUpdate={
          <NavItemUpdate
            schema={schema}
            maxLength={255}
            updateResourceMutation={updateSpaceMutation}
          />
        }
        resourcesUrl={resourcesUrl}
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
