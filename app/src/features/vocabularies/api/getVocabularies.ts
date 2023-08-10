import {
  type UseInfiniteQueryResult,
  useInfiniteQuery
} from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type PagenateResponse,
  type QueryConfig,
  pagenateResponse
} from "@/lib/react-query"

export const getVocabularies = async (
  spaceId: string | undefined,
  config: object
): Promise<PagenateResponse> => {
  const response = await axios.get(`/api/v1/spaces/${spaceId}/vocabularies`, {
    params: { ...config }
  })
  return pagenateResponse(response)
}

type QueryFnType = typeof getVocabularies

interface UseVocabulariesOptions {
  spaceId: string | undefined
  config?: QueryConfig<QueryFnType>
}

export const useVocabularies = ({
  config = {},
  spaceId
}: UseVocabulariesOptions): UseInfiniteQueryResult<
  PagenateResponse,
  unknown
> => {
  return useInfiniteQuery({
    queryKey: [`spaces/${spaceId}/vocabularies`, config],
    queryFn: async ({ pageParam = 1 }) =>
      await getVocabularies(spaceId, { ...config, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1
      } else {
        return undefined
      }
    }
  })
}
