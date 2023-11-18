import { SwitcherDialog, SwitcherDisplay } from "@/components/Elements"

import { NavItemSpace } from "../components/NavItemSpace"
import { DropDownSpace } from "../components/DropDownSpace"
import { NavItemSpaceUpdate } from "../components/NavItemSpaceUpdate"
import { DialogSpaceDelete } from "../components/DialogSpaceDelete"
import { type Space } from "../types"

// TODO: 「resource: Space | any」の' | any'については削除できるようにしたい
export const SpaceNavItem = (resource: Space | any): JSX.Element => {
  return (
    <>
      <SwitcherDialog>
        {(deleteSwitch) => (
          <>
            <DialogSpaceDelete
              resource={resource}
              isOpen={deleteSwitch.isOpen}
              close={deleteSwitch.closeWith}
            />
            <SwitcherDisplay>
              {(editSwitch) => (
                <>
                  {editSwitch.isOpen ? (
                    <div ref={editSwitch.clickAway}>
                      <NavItemSpaceUpdate
                        resource={resource}
                        toggle={editSwitch.toggle}
                      />
                    </div>
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
