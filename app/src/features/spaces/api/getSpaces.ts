// import { useQuery } from "@tanstack/react-query"

// import { axios } from "@/lib/axios"
// import { type ExtractFnReturnType, type QueryConfig } from "@/lib/react-query"

// import { type Space } from "../types"

// export const getSpaces = async (): Promise<Space[]> => {
//   const response = await axios.get(`/api/v1/spaces`)
//   return response.data
// }

// type QueryFnType = typeof getSpaces

// interface UseSpacesOptions {
//   config?: QueryConfig<QueryFnType>
// }

// export const useSpaces = ({ config }: UseSpacesOptions = {}) => {
//   return useQuery<ExtractFnReturnType<QueryFnType>>({
//     ...config,
//     queryKey: ["spaces"],
//     queryFn: async () => await getSpaces()
//   })
// }

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

export const getSpaces = async (config: object): Promise<PagenateResponse> => {
  const response = await axios.get(`/api/v1/spaces`, {
    params: { ...config }
  })
  return pagenateResponse(response)
}

// type QueryFnType = typeof getSpaces

// interface UseSpacesOptions {
//   config?: QueryConfig<QueryFnType> | object
// }

export const useSpaces = (): UseInfiniteQueryResult<
  PagenateResponse,
  unknown
> => {
  return useInfiniteQuery({
    queryKey: [`spaces`],
    queryFn: async ({ pageParam = 1 }) =>
      await getSpaces({
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
