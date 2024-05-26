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
    <ContentItem
      original={resource.follower.en}
      translation={resource.follower.ja}
      dropDown={dropDown}
    />
  )
}
