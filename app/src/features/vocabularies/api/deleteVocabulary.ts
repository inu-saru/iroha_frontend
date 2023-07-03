import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type MutationConfig, queryClient } from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Vocabulary } from "../types"

export const deleteVocabulary = async ({
  vocabularyId
}: {
  vocabularyId: string
}) => {
  return await axios.delete(
    `/api/v1/spaces/${thisSpaceId}/vocabularies/${vocabularyId}`
  )
}

let thisSpaceId: string

interface UseDeleteVocabularyOptions {
  spaceId: string
  config?: MutationConfig<typeof deleteVocabulary>
}

export const useDeleteVocabulary = ({
  config,
  spaceId
}: UseDeleteVocabularyOptions) => {
  const { addToast } = useToastStore()
  return useMutation({
    onMutate: async (deletedVocabulary) => {
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies`,
        config
      ])
      thisSpaceId = spaceId

      const previousVocabularies = queryClient.getQueryData<Vocabulary[]>([
        `spaces/${spaceId}/vocabularies`,
        config
      ])

      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabularies`, config],
        previousVocabularies?.filter(
          (vocabulary) => vocabulary.id !== deletedVocabulary.vocabularyId
        )
      )

      return { previousVocabularies }
    },
    onError: (_, __, context: any) => {
      if (context?.previousVocabularies) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/vocabularies`, config],
          context.previousVocabularies
        )
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`spaces/${spaceId}/vocabularies`])
      addToast({
        variant: "success",
        title: "ボキャブラリーを削除しました。"
      })
    },
    ...config,
    mutationFn: deleteVocabulary
  })
}
