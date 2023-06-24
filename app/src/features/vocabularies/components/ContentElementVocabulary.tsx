import { ContentHeader } from "@/components/Content"
import { ContentElement } from "@/components/Content/ContentElement"

import { useParams } from "react-router-dom"
import { useVocabulary } from "../api/getVocabulary"
import { DropDownVocabulary } from "./DropDownVocabulary"

export const ContentElementVocabulary = (): JSX.Element => {
  const { spaceId, vocabularyId } = useParams<{
    spaceId: string
    vocabularyId: string
  }>()
  const vocabularyQuery = useVocabulary({ spaceId, vocabularyId })

  return (
    <>
      <ContentHeader to={`/app/spaces/${spaceId}/vocabularies`} />
      <ContentElement
        resourceQuery={vocabularyQuery}
        dropDown={<DropDownVocabulary />}
      />
    </>
  )
}
