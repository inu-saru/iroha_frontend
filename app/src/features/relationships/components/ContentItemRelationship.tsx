import { ContentItem } from "@/components/Content/ContentItem"
import { SwitcherDialog, SwitcherDisplay } from "@/components/Elements"

import { DropDownRelationship } from "./DropDownRelationship"
import { ContentItemRelationshipUpdate } from "./ContentItemRelationshipUpdate"
import { DialogRelationshipDelete } from "./DialogRelationshipDelete"
import { type WipRelationship } from "../types"

// TODO: 「resource: WipRelationship | any」の' | any'については削除できるようにしたい
export const ContentItemRelationship = (
  resource: WipRelationship | any
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
                      <ContentItem
                        dropDown={
                          <DropDownRelationship
                            resource={resource}
                            editToggle={editSwitch.toggle}
                            deleteToggle={deleteSwitch.openWith}
                          />
                        }
                      >
                        <div className="flex gap-x-8 items-center">
                          <div className="text-h300 w-full">
                            {resource.follower.en}
                          </div>
                          <div className="text-middle text-natural-700 w-full">
                            {resource.follower.ja}
                          </div>
                        </div>
                      </ContentItem>
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
