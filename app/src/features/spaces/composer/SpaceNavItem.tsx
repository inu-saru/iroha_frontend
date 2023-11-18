import { SwitcherDialog, SwitcherDisplay } from "@/components/Elements"

import { NavItemSpace } from "../components/NavItemSpace"
import { DropDownSpace } from "../components/DropDownSpace"
import { NavItemSpaceUpdate } from "../components/NavItemSpaceUpdate"
import { DialogSpaceDelete } from "../components/DialogSpaceDelete"
import { type Relationship } from "../types"

// TODO: 「resource: Relationship | any」の' | any'については削除できるようにしたい
export const SpaceNavItem = (resource: Relationship | any): JSX.Element => {
  return (
    <>
      <SwitcherDialog>
        {(deleteSwitch) => (
          <>
            <DialogSpaceDelete
              isOpen={deleteSwitch.isOpen}
              close={deleteSwitch.closeWith}
              targetData={deleteSwitch.targetData}
            />
            <SwitcherDisplay>
              {(editSwitch) => (
                <>
                  {editSwitch.isOpen ? (
                    <NavItemSpaceUpdate
                      resource={resource}
                      toggle={editSwitch.toggle}
                    />
                  ) : (
                    <>
                      <NavItemSpace
                        resource={resource}
                        dropDown={
                          <DropDownSpace
                            resource={resource}
                            editToggle={editSwitch.toggle}
                            deleteToggle={deleteSwitch.openWith}
                          />
                        }
                      />
                    </>
                  )}
                </>
              )}
            </SwitcherDisplay>
          </>
        )}
      </SwitcherDialog>
    </>
  )
}
