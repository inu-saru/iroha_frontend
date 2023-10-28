import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Relationship } from "../types"

export interface CreateRelationshipDTO {
  data: any
}

export const createRelationship = async ({
  data
}: CreateRelationshipDTO): Promise<Relationship> => {
  const response = await axios.post(`/api/v1/batch`, data)
  return response.data
}

let thisSpaceId: string

interface UseCreateRelationshipOptions {
  spaceId: string | undefined
  vocabularyId: string | undefined
  config?: MutationConfig<typeof createRelationship>
}

export const useCreateRelationship = ({
  spaceId,
  vocabularyId,
  config
}: UseCreateRelationshipOptions) => {
  const { addToast } = useToastStore()
  thisSpaceId = spaceId ?? ""

  return useMutation({
    onMutate: async (newRelationship) => {
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies`,
        config
      ])

      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies/${vocabularyId}/followers`,
        config
      ])

      const previousVocabularies = queryClient.getQueryData<InfiniteQueryData>([
        `spaces/${spaceId}/vocabularies`,
        config
      ])

      const previousFollowers = queryClient.getQueryData<InfiniteQueryData>([
        `spaces/${spaceId}/vocabularies/${vocabularyId}/followers`,
        config
      ])

      const newVocabulariesPagesArray =
        previousVocabularies?.pages.map((page, index) => {
          return index === 0
            ? {
                resources: [
                  newRelationship["data"]["requests"][0]["body"]["vocabulary"],
                  ...(page.resources || [])
                ]
              }
            : page
        }) ?? []

      const newFollowersPagesArray =
        previousFollowers?.pages.map((page, index) => {
          return index === 0
            ? {
                resources: [
                  newRelationship["data"]["requests"][0]["body"]["vocabulary"],
                  ...(page.resources || [])
                ]
              }
            : page
        }) ?? []

      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabularies`, config],
        (previousVocabularies: any) => ({
          pages: newVocabulariesPagesArray,
          pageParams: previousVocabularies?.pageParams
        })
      )

      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabularies/${vocabularyId}/followers`, config],
        (previousFollowers: any) => ({
          pages: newFollowersPagesArray,
          pageParams: previousFollowers?.pageParams
        })
      )

      return { previousVocabularies, previousFollowers }
    },
    onError: (_, __, context: any) => {
      if (context?.previousVocabularies) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/vocabularies`, config],
          context.previousVocabularies
        )
      }
      if (context?.previousFollowers) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/vocabularies/${vocabularyId}/followers`, config],
          context.previousFollowers
        )
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`spaces/${spaceId}/vocabularies`])
      queryClient.invalidateQueries([
        `spaces/${spaceId}/vocabularies/${vocabularyId}/followers`
      ])
      addToast({
        variant: "success",
        title: "関連語を作成しました。"
      })
    },
    ...config,
    mutationFn: createRelationship
  })
}
