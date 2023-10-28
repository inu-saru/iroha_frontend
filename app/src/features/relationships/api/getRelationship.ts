import { useQuery } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type ExtractFnReturnType, type QueryConfig } from "@/lib/react-query"

import { type Relationship } from "../types"

export const getRelationship = async ({
  spaceId,
  relationshipId
}: {
  spaceId: string | undefined
  relationshipId: string | undefined
}): Promise<Relationship | null> => {
  const response = await axios.get(
    `/api/v1/spaces/${spaceId}/relationships/${relationshipId}`
  )
  return response.data
}

type QueryFnType = typeof getRelationship

interface UseRelationshipOptions {
  spaceId: string | undefined
  relationshipId: string | undefined
  config?: QueryConfig<QueryFnType>
}

export const useRelationship = ({
  config,
  spaceId,
  relationshipId
}: UseRelationshipOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [`spaces/${spaceId}/relationship`, relationshipId],
    queryFn: async () => await getRelationship({ spaceId, relationshipId })
  })
}
