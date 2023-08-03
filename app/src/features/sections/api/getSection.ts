import { useQuery } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type ExtractFnReturnType, type QueryConfig } from "@/lib/react-query"

import { type Section } from "../types"

export const getSection = async ({
  spaceId,
  sectionId
}: {
  spaceId: string | undefined
  sectionId: string | null
}): Promise<Section | null> => {
  if (sectionId === null) {
    return null
  }

  const response = await axios.get(
    `/api/v1/spaces/${spaceId}/sections/${sectionId}`
  )
  return response.data
}

type QueryFnType = typeof getSection

interface UseSectionOptions {
  spaceId: string | undefined
  sectionId: string | null
  config?: QueryConfig<QueryFnType>
}

export const useSection = ({
  config,
  spaceId,
  sectionId
}: UseSectionOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [`spaces/${spaceId}/section`, sectionId],
    queryFn: async () => await getSection({ spaceId, sectionId })
  })
}
