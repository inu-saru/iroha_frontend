import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type MutationConfig, queryClient } from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Section } from "../types"

export interface UpdateSectionDTO {
  data: {
    body: string
  }
  spaceId: string
  resourceId: string
}

export const updateSection = async ({
  data,
  resourceId
}: UpdateSectionDTO): Promise<Section> => {
  return await axios.patch(
    `/api/v1/spaces/${thisSpaceId}/sections/${resourceId}`,
    data
  )
}

let thisSpaceId: string

interface UseUpdateSectionOptions {
  config?: MutationConfig<typeof updateSection>
}

export const useUpdateSection = ({
  config,
  spaceId
}: UseUpdateSectionOptions) => {
  const { addToast } = useToastStore()
  thisSpaceId = spaceId

  return useMutation({
    onMutate: async (updatingSection: any) => {
      await queryClient.cancelQueries([
        `spaces/${spaceId}/sections`,
        updatingSection?.resourceId
      ])

      const previousSection = queryClient.getQueryData<Section>([
        `spaces/${spaceId}/sections`,
        updatingSection?.resourceId
      ])

      queryClient.setQueryData(
        [`spaces/${spaceId}/sections`, updatingSection?.resourceId],
        {
          ...previousSection,
          ...updatingSection.data,
          id: updatingSection.resourceId
        }
      )

      return { previousSection }
    },
    onError: (_, __, context: any) => {
      if (context?.previousSection) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/sections`, context.previousSection.id],
          context.previousSection
        )
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([`spaces/${spaceId}/sections`, data.id])
      addToast({
        type: "success",
        title: "セクションを更新しました。"
      })
    },
    ...config,
    mutationFn: updateSection
  })
}
