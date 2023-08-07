import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Vocabulary } from "../types"

export interface CreateVocabularyDTO {
  data: {
    name: string
  }
}

export const createVocabulary = async ({
  data
}: CreateVocabularyDTO): Promise<Vocabulary> => {
  const response = await axios.post(
    `/api/v1/spaces/${thisSpaceId}/vocabularies`,
    data
  )
  return response.data
}

let thisSpaceId: string

interface UseCreateVocabularyOptions {
  spaceId: string | undefined
  config?: MutationConfig<typeof createVocabulary>
}

export const useCreateVocabulary = ({
  config,
  spaceId
}: UseCreateVocabularyOptions) => {
  const { addToast } = useToastStore()
  thisSpaceId = spaceId ?? ""

  return useMutation({
    onMutate: async (newVocabulary) => {
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies`,
        config
      ])

      const previousVocabularies = queryClient.getQueryData<InfiniteQueryData>([
        `spaces/${spaceId}/vocabularies`,
        config
      ])

      const newPagesArray =
        previousVocabularies?.pages.map((page, index) => {
          return index === 0
            ? {
                resources: [newVocabulary.data, ...(page.resources || [])]
              }
            : page
        }) ?? []

      queryClient.setQueryData(
        [`spaces/${spaceId}/vocabularies`, config],
        (previousVocabularies: any) => ({
          pages: newPagesArray,
          pageParams: previousVocabularies?.pageParams
        })
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
        title: "ボキャブラリーを作成しました。"
      })
    },
    ...config,
    mutationFn: createVocabulary
  })
}
