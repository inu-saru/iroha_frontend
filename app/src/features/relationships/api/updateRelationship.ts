import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { Follow, type Relationship } from "../types"

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
  resource: Follow
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
      const updatingVocabularyId = resource.id
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

      // followers
      // NOTE: updateのコンポーネントが更新終了まで表示されるため、followersのcache更新は不要かもしれない。
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies/${vocabularyId}/followers`,
        config
      ])
      const previousFollowers = queryClient.getQueryData<InfiniteQueryData>([
        `spaces/${spaceId}/vocabularies/${vocabularyId}/followers`,
        config
      ])

      const newPagesFollowersArray =
        previousFollowers?.pages.map((page) => {
          return {
            ...page,
            resources: page.resources.map((follower) => {
              // NOTE: 別リソースでは更新対象リソースをURLで取得しているため文字列で比較している。ここもそれに合わせて文字列として比較いる。
              return `${follower.id}` === `${updatingVocabularyId}`
                ? { ...follower, ...updatingVocabularyParams }
                : follower
            })
          }
        }) ?? []

      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabularies/${vocabularyId}/followers`, config],
        (previousFollowers: any) => ({
          pages: newPagesFollowersArray,
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
        title: "関連語を更新しました。"
      })
    },
    ...config,
    mutationFn: updateRelationship
  })
}
