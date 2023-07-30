import { useQuery } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type ExtractFnReturnType, type QueryConfig } from "@/lib/react-query"

import { type Vocabulary } from "../types"

export const getVocabulary = async ({
  spaceId,
  vocabularyId
}: {
  spaceId: string | undefined
  vocabularyId: string | undefined
}): Promise<Vocabulary | null> => {
  const response = await axios.get(
    `/api/v1/spaces/${spaceId}/vocabularies/${vocabularyId}`
  )
  return response.data
}

type QueryFnType = typeof getVocabulary

interface UseVocabularyOptions {
  spaceId: string | undefined
  vocabularyId: string | undefined
  config?: QueryConfig<QueryFnType>
}

export const useVocabulary = ({
  config,
  spaceId,
  vocabularyId
}: UseVocabularyOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [`spaces/${spaceId}/vocabulary`, vocabularyId],
    queryFn: async () => await getVocabulary({ spaceId, vocabularyId })
  })
}
