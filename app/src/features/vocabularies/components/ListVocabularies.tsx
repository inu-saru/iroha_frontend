import { ListFilter, ListItems } from "@/components/List"
import { ListHeaderVocabulary } from "../composer/ListHeaderVocabulary"

import { useVocabularies } from "../api/getVocabularies"
import { useUrlParams } from "@/lib/useUrlParams"

export const ListVocabularies = (): JSX.Element => {
  const { spaceId, searchParams, config, setSearchParams } = useUrlParams()
  const vocabulariesQuery = useVocabularies({ config, spaceId })

  const resourcesUrl = (resourceId: string): string => {
    return `/app/spaces/${spaceId}/vocabularies/${resourceId}?${searchParams.toString()}`
  }

  return (
    <>
      <div className="flex flex-col h-screen border-r border-natural-40">
        <div>
          <ListFilter config={config} setSearchParams={setSearchParams} />
          <ListHeaderVocabulary />
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
