import { useRelationships } from "../api/getRelationships"
import { ContentItems } from "@/components/Content/ContentItems"
import { useUrlParams } from "@/lib/useUrlParams"

export const ContentItemsRelationship = (): JSX.Element => {
  const { spaceId, vocabularyId, config } = useUrlParams()
  const relationshipQuery = useRelationships({ spaceId, vocabularyId, config })

  return (
    <>
      <ContentItems resourcesQuery={relationshipQuery} />
    </>
  )
}
