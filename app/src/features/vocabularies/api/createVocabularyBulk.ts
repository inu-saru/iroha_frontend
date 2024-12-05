import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type VocabularyBulk } from "../types"

export interface CreateVocabularyBulkDTO {
  data: {
    name: string
  }
}

export const createVocabularyBulk = async ({
  data
}: CreateVocabularyBulkDTO): Promise<VocabularyBulk> => {
  const response = await axios.post(
    `/api/v1/spaces/${thisSpaceId}/vocabularies/bulk`,
    data
  )
  return response.data
}

let thisSpaceId: string

interface UseCreateVocabularyBulkOptions {
  spaceId: string | undefined
  config?: MutationConfig<typeof createVocabularyBulk>
}

export const useCreateVocabularyBulk = ({
  config,
  spaceId
}: UseCreateVocabularyBulkOptions) => {
  const { addToast } = useToastStore()
  thisSpaceId = spaceId ?? ""

  return useMutation({
    onMutate: async (newVocabulary) => {
      await queryClient.cancelQueries([
        `spaces/${spaceId}/vocabularies`,
        config
      ])
    },
    onError: (_, __, context: any) => {
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`spaces/${spaceId}/vocabularies`])
      addToast({
        variant: "success",
        title: "ボキャブラリーを作成しました。"
      })
    },
    ...config,
    mutationFn: createVocabularyBulk
  })
}
