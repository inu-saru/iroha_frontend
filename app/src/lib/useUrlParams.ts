import { useParams, useSearchParams } from "react-router-dom"
import { type SearchParams } from "@/types"

interface UrlParams {
  spaceId: string | undefined
  vocabularyId: string | undefined
  searchParams: URLSearchParams
  config: object
  setSearchParams: () => void
}

export const useUrlParams = (): UrlParams => {
  const { spaceId, vocabularyId } = useParams<{
    spaceId: string
    vocabularyId: string | undefined
  }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const entries = Array.from(searchParams.entries())
  const config: SearchParams = {}
  for (const [key, value] of entries) {
    config[key] = value
  }

  return {
    spaceId,
    vocabularyId,
    searchParams,
    config,
    setSearchParams
  }
}
