import { useRelationships } from "../api/getRelationships"
import { ContentItems } from "@/components/Content/ContentItems"
import { useUrlParams } from "@/lib/useUrlParams"

import { ContentItemRelationship } from "./ContentItemRelationship"

export const ContentItemsRelationship = (): JSX.Element => {
  const { spaceId, vocabularyId, config } = useUrlParams()
  const relationshipsQuery = useRelationships({
    spaceId,
    config: { ...config, followed_id: vocabularyId }
  })

  return (
    <>
      <ContentItems
        resourcesQuery={relationshipsQuery}
        contentItem={<ContentItemRelationship />}
      />
    </>
  )
}
