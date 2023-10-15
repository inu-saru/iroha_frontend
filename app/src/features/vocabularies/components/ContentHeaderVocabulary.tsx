import { ContentHeader } from "@/components/Content"
import { useUrlParams } from "@/lib/useUrlParams"

export const ContentHeaderVocabulary = (): JSX.Element => {
  const { spaceId, searchParams } = useUrlParams()

  return (
    <>
      <ContentHeader
        to={`/app/spaces/${spaceId}/vocabularies?${searchParams.toString()}`}
      />
    </>
  )
}
