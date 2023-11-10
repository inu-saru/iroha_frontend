import { SwitcherDialog, SwitcherDisplay } from "@/components/Elements"

import { ContentItemRelationship } from "../components/ContentItemRelationship"
import { DropDownRelationship } from "../components/DropDownRelationship"
import { ContentItemRelationshipUpdate } from "../components/ContentItemRelationshipUpdate"
import { DialogRelationshipDelete } from "../components/DialogRelationshipDelete"
import { type Relationship } from "../types"

// TODO: 「resource: Relationship | any」の' | any'については削除できるようにしたい
export const RelationshipContentItem = (
  resource: Relationship | any
): JSX.Element => {
  return (
    <>
      <SwitcherDialog>
        {(deleteSwitch) => (
          <>
            <DialogRelationshipDelete
              isOpen={deleteSwitch.isOpen}
              close={deleteSwitch.closeWith}
              targetData={deleteSwitch.targetData}
            />
            <SwitcherDisplay>
              {(editSwitch) => (
                <>
                  {editSwitch.isOpen ? (
                    <ContentItemRelationshipUpdate
                      resource={resource}
                      toggle={editSwitch.toggle}
                    />
                  ) : (
                    <>
                      <ContentItemRelationship
                        resource={resource}
                        dropDown={
                          <DropDownRelationship
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
