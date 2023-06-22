import { useQuery } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type ExtractFnReturnType, type QueryConfig } from "@/lib/react-query"

import { type Section } from "../types"

export const getSections = async (spaceId: string): Promise<Section[]> => {
  const response = await axios.get(`/api/v1/spaces/${spaceId}/sections`)
  return response.data
}

type QueryFnType = typeof getSections

interface UseSectionsOptions {
  spaceId: string
  config?: QueryConfig<QueryFnType>
}

export const useSections = ({ config, spaceId }: UseSectionsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [`spaces/${spaceId}/sections`],
    queryFn: async () => await getSections(spaceId)
  })
}
