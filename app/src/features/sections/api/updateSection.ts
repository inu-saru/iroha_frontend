import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type MutationConfig, queryClient } from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Section } from "../types"

export interface UpdateSectionDTO {
  data: {
    name: string
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
  spaceId: string
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
      // section
      await queryClient.cancelQueries([
        "section",
        `${updatingSection?.resourceId}`
      ])
      const previousSection = queryClient.getQueryData<Section>([
        "section",
        `${updatingSection?.resourceId}`
      ])
      queryClient.setQueryData(["section", `${updatingSection?.resourceId}`], {
        ...previousSection,
        ...updatingSection.data,
        id: updatingSection.resourceId
      })

      // sections
      await queryClient.cancelQueries([`spaces/${spaceId}/sections`])
      const previousSections = queryClient.getQueryData<Section>([
        `spaces/${spaceId}/sections`
      ])
      const tempUpdatedSections = previousSections?.map((section) =>
        section.id === updatingSection?.resourceId
          ? { ...section, ...updatingSection.data }
          : section
      )
      queryClient.setQueryData(
        [`spaces/${spaceId}/sections`],
        tempUpdatedSections
      )

      return { previousSection, previousSections }
    },
    onError: (_, __, context: any) => {
      if (context?.previousSection) {
        queryClient.setQueryData(
          [`section`, `${context.previousSection.id}`],
          context.previousSection
        )
      }
      if (context?.previousSections) {
        queryClient.setQueryData(
          [`spaces/${spaceId}/sections`],
          context.previousSections
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
