import { useQuery } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type ExtractFnReturnType, type QueryConfig } from "@/lib/react-query"

import { type Vocabulary } from "../types"

export const getVocabularies = async (
  spaceId: string
): Promise<Vocabulary[]> => {
  const response = await axios.get(`/api/v1/spaces/${spaceId}/vocabularies`)
  return response.data
}

type QueryFnType = typeof getVocabularies

interface UseVocabulariesOptions {
  spaceId: string
  config?: QueryConfig<QueryFnType>
}

export const useVocabularies = ({
  config,
  spaceId
}: UseVocabulariesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [`spaces/${spaceId}/vocabularies`],
    queryFn: async () => await getVocabularies(spaceId)
  })
}
