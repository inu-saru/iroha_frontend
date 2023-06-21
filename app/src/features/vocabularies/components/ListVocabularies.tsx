import { ListItems } from "@/components/List"
import { ListHeaderSection } from "@/features/sections/components/ListHeaderSection"
import { useParams } from "react-router-dom"
import { useVocabularies } from "../api/getVocabularies"

export const ListVocabularies = (): JSX.Element => {
  const { spaceId } = useParams<{
    spaceId: string
  }>()
  const sectionsQuery = useVocabularies({ spaceId })

  const resourcesUrl = (resourceId: string): string => {
    return `/app/spaces/${spaceId}/vocabularies/${resourceId}`
  }

  return (
    <>
      <ListHeaderSection />
      <ListItems resourcesQuery={sectionsQuery} resourcesUrl={resourcesUrl} />
    </>
  )
}
