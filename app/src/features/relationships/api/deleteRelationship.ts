import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

export const deleteRelationship = async ({
  relationshipId
}: {
  relationshipId: string
}) => {
  return await axios.delete(
    `/api/v1/spaces/${thisSpaceId}/relationships/${relationshipId}`
  )
}

let thisSpaceId: string

interface UseDeleteVocabularyOptions {
  spaceId: string | undefined
  vocabularyId: string | undefined
  config?: MutationConfig<typeof deleteRelationship>
}

export const useDeleteRelationship = ({
  spaceId,
  vocabularyId,
  config
}: UseDeleteVocabularyOptions) => {
  const { addToast } = useToastStore()
  thisSpaceId = spaceId ?? ""

  return useMutation({
    onMutate: async ({ relationshipId }) => {
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies/${vocabularyId}/followers`,
        config
      ])

      const previousFollowers = queryClient.getQueryData<InfiniteQueryData>([
        `spaces/${spaceId}/vocabularies/${vocabularyId}/followers`,
        config
      ])

      const newPagesArray =
        previousFollowers?.pages.map((page) => {
          return {
            ...page,
            resources: page.resources.filter((follower) => {
              return follower.relationship_id !== relationshipId
            })
          }
        }) ?? []

      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabularies/${vocabularyId}/followers`, config],
        (previousFollowers: any) => ({
          pages: newPagesArray,
          pageParams: previousFollowers?.pageParams
        })
      )
      return { previousFollowers }
    },
    onError: (_, __, context: any) => {
      if (context?.previousFollowers) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/vocabularies/${vocabularyId}/followers`, config],
          context.previousFollowers
        )
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        `spaces/${spaceId}/vocabularies/${vocabularyId}/followers`
      ])
      addToast({
        variant: "success",
        title: "関連語から削除しました。"
      })
    },
    ...config,
    mutationFn: deleteRelationship
  })
}
