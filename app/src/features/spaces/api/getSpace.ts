import { useQuery } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type ExtractFnReturnType, type QueryConfig } from "@/lib/react-query"

import { type Space } from "../types"

export const getSpace = async ({
  spaceId
}: {
  spaceId: string | undefined
}): Promise<Space> => {
  const response = await axios.get(`/api/v1/spaces/${spaceId}`)
  return response.data
}

type QueryFnType = typeof getSpace

interface UseSpaceOptions {
  spaceId: string | undefined
  config?: QueryConfig<QueryFnType>
}

export const useSpace = ({ spaceId, config }: UseSpaceOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["space", spaceId],
    queryFn: async () => await getSpace({ spaceId })
  })
}
