import { ContentItem } from "@/components/Content/ContentItem"

import { type Relationship } from "../types"
import { useUrlParams } from "@/lib/useUrlParams"

interface ContentItemRelationshipProps {
  resource: Relationship | any
  dropDown?: JSX.Element
}

export const ContentItemRelationship = ({
  resource,
  dropDown
}: ContentItemRelationshipProps): JSX.Element => {
  const { vocabularyId } = useUrlParams()
  // NOTE: resouce.followedはtanstackQueryの一時データの場合はnullになっている
  const relation = resource.followed == null || resource.followed.id.toString() === vocabularyId ? resource.follower : resource.followed
  const variant = relation.vocabulary_type === 'sentence' ? 'column' : 'row'

  return (
    <ContentItem
      variant={variant}
      original={relation.en}
      translation={relation.ja}
      dropDown={dropDown}
    />
  )
}
