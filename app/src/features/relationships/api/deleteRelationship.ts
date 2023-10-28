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
  config?: MutationConfig<typeof deleteRelationship>
}

export const useDeleteRelationship = ({
  spaceId,
  config
}: UseDeleteVocabularyOptions) => {
  const { addToast } = useToastStore()
  thisSpaceId = spaceId ?? ""

  return useMutation({
    onMutate: async ({ relationshipId }) => {
      await queryClient.cancelQueries([
        `spaces/${spaceId}/relationships`,
        config
      ])

      const previousRelationships = queryClient.getQueryData<InfiniteQueryData>(
        [`spaces/${spaceId}/relationships`, config]
      )

      const newPagesArray =
        previousRelationships?.pages.map((page) => {
          return {
            ...page,
            resources: page.resources.filter((relationship) => {
              return relationship.id !== relationshipId
            })
          }
        }) ?? []

      queryClient.setQueryData(
        [`spaces/${spaceId}/relationships`, config],
        (previousRelationships: any) => ({
          pages: newPagesArray,
          pageParams: previousRelationships?.pageParams
        })
      )
      return { previousRelationships }
    },
    onError: (_, __, context: any) => {
      if (context?.previousRelationships) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/relationships`, config],
          context.previousRelationships
        )
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`spaces/${spaceId}/relationships`])
      addToast({
        variant: "success",
        title: "関連語から削除しました。"
      })
    },
    ...config,
    mutationFn: deleteRelationship
  })
}
