import { useQuery } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type ExtractFnReturnType, type QueryConfig } from "@/lib/react-query"

import { type Space } from "../types"

export const getSpaces = async (): Promise<Space[]> => {
  const response = await axios.get(`/api/v1/spaces`)
  return response.data
}

type QueryFnType = typeof getSpaces

interface UseSpacesOptions {
  config?: QueryConfig<QueryFnType>
}

export const useSpaces = ({ config }: UseSpacesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["spaces"],
    queryFn: async () => await getSpaces()
  })
}
