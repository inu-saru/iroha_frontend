import { useRelationships } from "../api/getRelationships"
import { ContentItems } from "@/components/Content/ContentItems"
import { useUrlParams } from "@/lib/useUrlParams"

import { type VocabularyTypes } from "@/features/vocabularies/types"
import { RelationshipContentItem } from "../composer/RelationshipContentItem"

interface ContentItemsRelationshipProps {
  vocabularyType: VocabularyTypes
}

export const ContentItemsRelationship = (
  {vocabularyType}: ContentItemsRelationshipProps
): JSX.Element => {
  const { spaceId, vocabularyId, config } = useUrlParams()
  const params = vocabularyType === 'sentence' ? { followed_id: vocabularyId } : { follower_id: vocabularyId }
  const relationshipsQuery = useRelationships({
    spaceId,
    config: { ...config, ...params }
  })

  return (
    <>
      <ContentItems
        resourcesQuery={relationshipsQuery}
        contentItem={<RelationshipContentItem />}
      />
    </>
  )
}
