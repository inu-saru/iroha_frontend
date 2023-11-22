import { SwitcherDialog, SwitcherDisplay } from "@/components/Elements"

import { NavItemSection } from "../components/NavItemSection"
import { DropDownSection } from "../components/DropDownSection"
import { NavItemSectionUpdate } from "../components/NavItemSectionUpdate"
import { DialogSectionDelete } from "../components/DialogSectionDelete"
import { type Section } from "../types"

// TODO: 「resource: Section | any」の' | any'については削除できるようにしたい
export const SectionNavItem = (resource: Section | any): JSX.Element => {
  return (
    <>
      <SwitcherDialog>
        {(deleteSwitch) => (
          <>
            <DialogSectionDelete
              resource={resource}
              isOpen={deleteSwitch.isOpen}
              close={deleteSwitch.closeWith}
            />
            <SwitcherDisplay>
              {(editSwitch) => (
                <>
                  {editSwitch.isOpen ? (
                    <div ref={editSwitch.clickAway}>
                      <NavItemSectionUpdate
                        resource={resource}
                        toggle={editSwitch.toggle}
                      />
                    </div>
                  ) : (
                    <>
                      <NavItemSection
                        resource={resource}
                        dropDown={
                          <DropDownSection
                            editToggle={editSwitch.toggle}
                            deleteToggle={deleteSwitch.open}
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
