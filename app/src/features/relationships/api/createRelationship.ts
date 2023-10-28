import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type BatchRelationship } from "../types"

export interface CreateRelationshipDTO {
  data: any
}

export const createRelationship = async ({
  data
}: CreateRelationshipDTO): Promise<BatchRelationship> => {
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
      // vocaburaries
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies`,
        config
      ])

      const previousVocabularies = queryClient.getQueryData<InfiniteQueryData>([
        `spaces/${spaceId}/vocabularies`,
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

      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabularies`, config],
        (previousVocabularies: any) => ({
          pages: newVocabulariesPagesArray,
          pageParams: previousVocabularies?.pageParams
        })
      )

      // relationships
      await queryClient.cancelQueries([
        `spaces/${spaceId}/relationships`,
        { ...config, followed_id: vocabularyId }
      ])

      const previousRelationships = queryClient.getQueryData<InfiniteQueryData>(
        [
          `spaces/${spaceId}/relationships`,
          { ...config, followed_id: vocabularyId }
        ]
      )

      const newPagesRelationshipsArray =
        previousRelationships?.pages.map((page, index) => {
          return index === 0
            ? {
                resources: [
                  {
                    follower:
                      newRelationship["data"]["requests"][0]["body"][
                        "vocabulary"
                      ]
                  },
                  ...(page.resources || [])
                ]
              }
            : page
        }) ?? []

      queryClient.setQueryData(
        [
          `spaces/${spaceId}/relationships`,
          { ...config, followed_id: vocabularyId }
        ],
        (previousRelationships: any) => ({
          pages: newPagesRelationshipsArray,
          pageParams: previousRelationships?.pageParams
        })
      )

      return { previousVocabularies, previousRelationships }
    },
    onError: (_, __, context: any) => {
      if (context?.previousVocabularies) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/vocabularies`, config],
          context.previousVocabularies
        )
      }
      if (context?.previousRelationships) {
        queryClient.setQueryData(
          [
            `spaces/${spaceId}/relationships`,
            { ...config, followed_id: vocabularyId }
          ],
          context.previousRelationships
        )
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`spaces/${spaceId}/vocabularies`])
      queryClient.invalidateQueries([`spaces/${spaceId}/relationships`])
      addToast({
        variant: "success",
        title: "関連語を作成しました。"
      })
    },
    ...config,
    mutationFn: createRelationship
  })
}
