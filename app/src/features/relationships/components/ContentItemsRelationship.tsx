import { useRelationships } from "../api/getRelationships"
import { ContentItems } from "@/components/Content/ContentItems"
import { useUrlParams } from "@/lib/useUrlParams"

import { ContentItemRelationshipUpdate } from "./ContentItemRelationshipUpdate"
import { DropDownRelationship } from "./DropDownRelationship"

export const ContentItemsRelationship = (): JSX.Element => {
  const { spaceId, vocabularyId, config } = useUrlParams()
  const relationshipQuery = useRelationships({ spaceId, vocabularyId, config })

  return (
    <>
      <ContentItems
        resourcesQuery={relationshipQuery}
        contentItemUpdate={<ContentItemRelationshipUpdate />}
        dropDown={<DropDownRelationship />}
      />
    </>
  )
}
