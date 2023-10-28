import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { WipRelationship, type Relationship } from "../types"

export interface UpdateRelationshipDTO {
  data: any
}

export const updateRelationship = async ({
  data
}: UpdateRelationshipDTO): Promise<Relationship> => {
  const response = await axios.post(`/api/v1/batch`, data)
  return response.data
}

let thisSpaceId: string

interface UseUpdateRelationshipOptions {
  spaceId: string | undefined
  vocabularyId: string | undefined
  resource: WipRelationship
  config?: MutationConfig<typeof updateRelationship>
}

export const useUpdateRelationship = ({
  spaceId,
  vocabularyId,
  resource,
  config
}: UseUpdateRelationshipOptions) => {
  const { addToast } = useToastStore()
  thisSpaceId = spaceId ?? ""

  return useMutation({
    onMutate: async (updatingRelationship) => {
      const updatingVocabularyId = resource.follower.id
      const updatingVocabularyParams =
        updatingRelationship.data.requests[0].body.vocabulary

      //vocabularies
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies`,
        config
      ])

      const previousVocabularies = queryClient.getQueryData<InfiniteQueryData>([
        `spaces/${spaceId}/vocabularies`,
        config
      ])

      const newVocabulariesPagesArray =
        previousVocabularies?.pages.map((page) => {
          return {
            ...page,
            resources: page.resources.map((vocabulary) => {
              // NOTE: 別リソースでは更新対象リソースをURLで取得しているため文字列で比較している。ここもそれに合わせて文字列として比較いる。
              return `${vocabulary.id}` === `${updatingVocabularyId}`
                ? { ...vocabulary, ...updatingVocabularyParams }
                : vocabulary
            })
          }
        }) ?? []

      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabularies`, config],
        (previousVocabularies: any) => ({
          pages: newVocabulariesPagesArray,
          pageParams: previousVocabularies?.pageParams
        })
      )

      // relationships
      // NOTE: updateのコンポーネントが更新終了まで表示されるため、relationshipsのcache更新は不要かもしれない。
      // FIXME: relationshipsのconfigとしてfollowed_idを指定している。一方vocabulariesはfollowed_idを利用していないためここで調整している
      await queryClient.cancelQueries([
        `spaces/${spaceId}/relationships`,
        config
      ])
      const previousRelationships = queryClient.getQueryData<InfiniteQueryData>(
        [
          `spaces/${spaceId}/relationships`,
          { ...config, followed_id: vocabularyId }
        ]
      )

      const newPagesRelationshipsArray =
        previousRelationships?.pages.map((page) => {
          return {
            ...page,
            resources: page.resources.map((relationship) => {
              // NOTE: 別リソースでは更新対象リソースをURLで取得しているため文字列で比較している。ここもそれに合わせて文字列として比較いる。
              return `${relationship.id}` === `${updatingVocabularyId}`
                ? { ...relationship, ...updatingVocabularyParams }
                : relationship
            })
          }
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

      // relationship
      const updatingRelationshipId = resource.id
      const updatingRelationshipParams =
        updatingRelationship.data.requests[1].body.relationship

      await queryClient.cancelQueries([
        `spaces/${spaceId}/relationship`,
        updatingRelationshipId
      ])
      const previousRelationship = queryClient.getQueryData<WipRelationship>([
        `spaces/${spaceId}/relationship`,
        updatingRelationshipId
      ])
      const newRelationship = {
        follower: { ...updatingVocabularyParams },
        ...updatingRelationshipParams
      }
      queryClient.setQueryData(
        [`spaces/${spaceId}/relationship`, updatingRelationshipId],
        {
          ...previousRelationship,
          ...newRelationship
        }
      )

      return {
        previousVocabularies,
        previousRelationships
      }
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
        title: "関連語を更新しました。"
      })
    },
    ...config,
    mutationFn: updateRelationship
  })
}
