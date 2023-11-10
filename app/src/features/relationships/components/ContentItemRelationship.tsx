import { ContentItem } from "@/components/Content/ContentItem"

import { type Relationship } from "../types"

interface ContentItemRelationshipProps {
  resource: Relationship | any
  dropDown?: JSX.Element
}

export const ContentItemRelationship = ({
  resource,
  dropDown
}: ContentItemRelationshipProps): JSX.Element => {
  return (
    <ContentItem dropDown={dropDown}>
      <div className="flex gap-x-8 items-center">
        <div className="text-h300 w-full">{resource.follower.en}</div>
        <div className="text-middle text-natural-700 w-full">
          {resource.follower.ja}
        </div>
      </div>
    </ContentItem>
  )
}
