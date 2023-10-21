import { ContentItem } from "@/components/Content/ContentItem"
import { DropDownRelationship } from "./DropDownRelationship"
import { ContentItemRelationshipUpdate } from "./ContentItemRelationshipUpdate"
import { SwitcherDisplay } from "@/components/Elements"
import { type Follow } from "../types"

// TODO: 「resource: Follow | any」の' | any'については削除できるようにしたい
export const ContentItemRelationship = (
  resource: Follow | any
): JSX.Element => {
  return (
    <>
      <SwitcherDisplay>
        {(methods) => (
          <>
            {methods.isOpen ? (
              <ContentItemRelationshipUpdate
                resource={resource}
                toggle={methods.toggle}
              />
            ) : (
              <>
                <ContentItem
                  dropDown={
                    <DropDownRelationship editToggle={methods.toggle} />
                  }
                >
                  <div className="flex gap-x-8 items-center">
                    <div className="text-h300 w-full">{resource.en}</div>
                    <div className="text-middle text-natural-700 w-full">
                      {resource.ja}
                    </div>
                  </div>
                </ContentItem>
              </>
            )}
          </>
        )}
      </SwitcherDisplay>
    </>
  )
}
