import { Icon, SwitcherDialog, SwitcherDisplay } from "@/components/Elements"
import { NavHeader, NavItems } from "@/components/Nav"
import { NavItemCreateSpace } from "./NavItemCreateSpace"
import { NavItemUpdateSpace } from "./NavItemUpdateSpace"
import { ConfirmationDialogSpace } from "./ConfirmationDialogSpace"

import { useSpaces } from "../api/getSpaces"
import { DropDownSpace } from "./DropDownSpace"
import { useCreateSpace } from "../api/createSpace"
import { useUpdateSpace } from "../api/updateSpace"
import { useDeleteSpace } from "../api/deleteSpace"

export const Spaces = (): JSX.Element => {
  const spacesQuery = useSpaces()
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
      <SwitcherDialog>
        {(methods) => (
          <>
            <NavItems
              resourcesQuery={spacesQuery}
              navItemUpdate={
                <NavItemUpdateSpace updateSpaceMutation={updateSpaceMutation} />
              }
              resourcesUrl={resourcesUrl}
              icon="space"
              dropDown={<DropDownSpace deleteToggle={methods.openWith} />}
            />
            <ConfirmationDialogSpace
              resourceId={methods.targetData.spaceId}
              label={methods.targetData.label}
              deleteSpaceMutation={deleteSpaceMutation}
              isOpen={methods.isOpen}
              close={methods.closeWith}
            />
          </>
        )}
      </SwitcherDialog>
    </>
  )
}
