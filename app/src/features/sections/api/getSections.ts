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

export const getSections = async (
  spaceId: string | undefined,
  config: object
): Promise<PagenateResponse> => {
  const response = await axios.get(`/api/v1/spaces/${spaceId}/sections`, {
    params: { ...config }
  })
  return pagenateResponse(response)
}

type QueryFnType = typeof getSections

interface UseSectionsOptions {
  spaceId: string | undefined
  config?: QueryConfig<QueryFnType>
}

export const useSections = ({
  spaceId,
  config = {}
}: UseSectionsOptions): UseInfiniteQueryResult<PagenateResponse, unknown> => {
  return useInfiniteQuery({
    queryKey: [`spaces/${spaceId}/sections`],
    queryFn: async ({ pageParam = 1 }) =>
      await getSections(spaceId, { ...config, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1
      } else {
        return undefined
      }
    }
  })
}
