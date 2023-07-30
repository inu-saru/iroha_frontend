import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type MutationConfig, queryClient } from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Section } from "../types"

export interface CreateSectionDTO {
  data: {
    name: string
  }
}

export const createSection = async ({
  data
}: CreateSectionDTO): Promise<Section> => {
  const response = await axios.post(
    `/api/v1/spaces/${thisSpaceId}/sections`,
    data
  )
  return response.data
}

let thisSpaceId: string

interface UseCreateSectionOptions {
  spaceId: string | undefined
  config?: MutationConfig<typeof createSection>
}

export const useCreateSection = ({
  config,
  spaceId
}: UseCreateSectionOptions) => {
  const { addToast } = useToastStore()
  thisSpaceId = spaceId ?? ""

  return useMutation({
    onMutate: async (newSection) => {
      await queryClient.cancelQueries([`spaces/${spaceId}/sections`])

      const previousSections = queryClient.getQueryData<Section[]>([
        `spaces/${spaceId}/sections`
      ])

      queryClient.setQueryData(
        [`spaces/${spaceId}/sections`],
        [newSection.data, ...(previousSections || [])]
      )

      return { previousSections }
    },
    onError: (_, __, context: any) => {
      if (context?.previousSections) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/sections`],
          context.previousSections
        )
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`spaces/${spaceId}/sections`])
      addToast({
        variant: "success",
        title: "セクションを作成しました。"
      })
    },
    ...config,
    mutationFn: createSection
  })
}
