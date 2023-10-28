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

export const getRelationships = async (
  spaceId: string | undefined,
  vocabularyId: string | undefined,
  config: object
): Promise<PagenateResponse> => {
  const response = await axios.get(`/api/v1/spaces/${spaceId}/relationships`, {
    params: { ...config }
  })
  return pagenateResponse(response)
}

type QueryFnType = typeof getRelationships

interface UseRelationshipsOptions {
  spaceId: string | undefined
  vocabularyId: string | undefined
  config?: QueryConfig<QueryFnType> | object
}

export const useRelationships = ({
  spaceId,
  vocabularyId,
  config = {}
}: UseRelationshipsOptions): UseInfiniteQueryResult<
  PagenateResponse,
  unknown
> => {
  return useInfiniteQuery({
    queryKey: [`spaces/${spaceId}/relationships`, config],
    queryFn: async ({ pageParam = 1 }) =>
      await getRelationships(spaceId, vocabularyId, {
        ...config,
        page: pageParam
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1
      } else {
        return undefined
      }
    }
  })
}
