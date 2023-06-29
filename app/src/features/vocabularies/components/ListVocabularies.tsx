import { ListFilter, ListItems } from "@/components/List"
import { ListHeaderSection } from "@/features/sections/components/ListHeaderSection"
import { useParams, useSearchParams } from "react-router-dom"
import { useVocabularies } from "../api/getVocabularies"

export const ListVocabularies = (): JSX.Element => {
  const { spaceId } = useParams<{
    spaceId: string
  }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const entries = Array.from(searchParams.entries())
  const config = {}
  for (const [key, value] of entries) {
    config[key] = value
  }
  const vocabulariesQuery = useVocabularies({ config, spaceId })

  const resourcesUrl = (resourceId: string): string => {
    return `/app/spaces/${spaceId}/vocabularies/${resourceId}?${searchParams.toString()}`
  }

  return (
    <>
      <div className="flex flex-col h-screen border-r border-natural-40">
        <div>
          <ListFilter config={config} setSearchParams={setSearchParams} />
          <ListHeaderSection />
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          <ListItems
            resourcesQuery={vocabulariesQuery}
            resourcesUrl={resourcesUrl}
          />
        </div>
      </div>
    </>
  )
}
