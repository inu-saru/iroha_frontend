import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type MutationConfig, queryClient } from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Vocabulary } from "../types"
import { Vocabulary } from "../routes/Vocabulary"

export interface UpdateVocabularyDTO {
  data: {
    name: string
  }
  spaceId?: string | undefined
  vocabularyId: string | undefined
}

export const updateVocabulary = async ({
  data,
  vocabularyId
}: UpdateVocabularyDTO): Promise<Vocabulary> => {
  const response = await axios.patch(
    `/api/v1/spaces/${thisSpaceId}/vocabularies/${vocabularyId}`,
    data
  )
  return response.data
}

let thisSpaceId: string

interface UseUpdateVocabularyOptions {
  spaceId: string | undefined
  config?: MutationConfig<typeof updateVocabulary>
}

export const useUpdateVocabulary = ({
  config,
  spaceId
}: UseUpdateVocabularyOptions) => {
  const { addToast } = useToastStore()
  thisSpaceId = spaceId ?? ""

  return useMutation({
    onMutate: async (updatingVocabulary: any) => {
      // vocabulary
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabulary`,
        `${updatingVocabulary?.vocabularyId}`
      ])
      const previousVocabulary = queryClient.getQueryData<Vocabulary>([
        `spaces/${spaceId}/vocabulary`,
        `${updatingVocabulary?.vocabularyId}`
      ])
      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabulary`, `${updatingVocabulary?.vocabularyId}`],
        {
          ...previousVocabulary,
          ...updatingVocabulary.data,
          id: updatingVocabulary.vocabularyId
        }
      )

      // vocaburaries
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies`,
        config
      ])
      const previousVocabularies = queryClient.getQueryData<Vocabulary[]>([
        `spaces/${spaceId}/vocabularies`,
        config
      ])
      const tempUpdatedVocabularies = previousVocabularies?.map((vocabulary) =>
        `${vocabulary.id}` === updatingVocabulary?.vocabularyId
          ? { ...vocabulary, ...updatingVocabulary.data }
          : vocabulary
      )
      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabularies`, config],
        tempUpdatedVocabularies
      )

      return { previousVocabulary, previousVocabularies }
    },
    onError: (_, __, context: any) => {
      if (context?.previousVocabulary) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/vocabulary`, `${context.previousVocabulary.id}`],
          context.previousVocabulary
        )
      }
      if (context?.previousVocabularies) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/vocabularies`, config],
          context.previousVocabularies
        )
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([`spaces/${spaceId}/vocabularies`, data.id])
      addToast({
        variant: "success",
        title: "ボキャブラリーを更新しました。"
      })
    },
    ...config,
    mutationFn: updateVocabulary
  })
}
