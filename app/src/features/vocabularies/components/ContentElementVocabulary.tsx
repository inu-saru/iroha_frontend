import { ContentHeader } from "@/components/Content"
import { ContentElement } from "@/components/Content/ContentElement"

import { useParams, useSearchParams } from "react-router-dom"
import { useVocabulary } from "../api/getVocabulary"
import { DropDownVocabulary } from "./DropDownVocabulary"

export const ContentElementVocabulary = (): JSX.Element => {
  const { spaceId, vocabularyId } = useParams<{
    spaceId: string
    vocabularyId: string
  }>()
  const [searchParams] = useSearchParams()
  const vocabularyQuery = useVocabulary({ spaceId, vocabularyId })

  return (
    <>
      <ContentHeader
        to={`/app/spaces/${spaceId}/vocabularies?${searchParams.toString()}`}
      />
      <ContentElement
        resourceQuery={vocabularyQuery}
        dropDown={<DropDownVocabulary />}
      />
    </>
  )
}
