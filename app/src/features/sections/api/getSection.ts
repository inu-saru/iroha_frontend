import { useQuery } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type ExtractFnReturnType, type QueryConfig } from "@/lib/react-query"

import { type Section } from "../types"

export const getSection = async ({
  spaceId,
  sectionId
}: {
  spaceId: string
  sectionId: string
}): Promise<Section> => {
  const response = await axios.get(
    `/api/v1/spaces/${spaceId}/sections/${sectionId}`
  )
  return response.data
}

type QueryFnType = typeof getSection

interface UseSectionOptions {
  sectionId: string
  config?: QueryConfig<QueryFnType>
}

export const useSection = ({
  config,
  spaceId,
  sectionId
}: UseSectionOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["section", sectionId],
    queryFn: async () => await getSection({ spaceId, sectionId })
  })
}
