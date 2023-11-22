import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Section } from "../types"

export interface UpdateSectionDTO {
  data: {
    name: string
  }
  spaceId: string | undefined
  resourceId: string
}

export const updateSection = async ({
  data,
  spaceId,
  resourceId
}: UpdateSectionDTO): Promise<Section> => {
  return await axios.patch(
    `/api/v1/spaces/${spaceId}/sections/${resourceId}`,
    data
  )
}

interface UseUpdateSectionOptions {
  spaceId: string | undefined
  config?: MutationConfig<typeof updateSection>
}

export const useUpdateSection = ({
  config,
  spaceId
}: UseUpdateSectionOptions) => {
  const { addToast } = useToastStore()

  return useMutation({
    onMutate: async (updatingSection: UpdateSectionDTO) => {
      // section
      await queryClient.cancelQueries([
        `spaces/${spaceId}/section`,
        `${updatingSection?.resourceId}`
      ])
      const previousSection = queryClient.getQueryData<Section>([
        `spaces/${spaceId}/section`,
        `${updatingSection?.resourceId}`
      ])
      queryClient.setQueryData(
        [`spaces/${spaceId}/section`, `${updatingSection?.resourceId}`],
        {
          ...previousSection,
          ...updatingSection.data,
          id: updatingSection.resourceId
        }
      )

      // sections
      await queryClient.cancelQueries([`spaces/${spaceId}/sections`])
      const previousSections = queryClient.getQueryData<InfiniteQueryData>([
        `spaces/${spaceId}/sections`
      ])
      const newSectionsPagesArray =
        previousSections?.pages.map((page) => {
          return {
            ...page,
            resources: page.resources.map((section) => {
              return section.id === updatingSection?.resourceId
                ? { ...section, ...updatingSection.data }
                : section
            })
          }
        }) ?? []
      queryClient.setQueryData(
        [`spaces/${spaceId}/sections`],
        (previousSections: any) => ({
          pages: newSectionsPagesArray,
          pageParams: previousSections?.pageParams
        })
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
      queryClient.refetchQueries([`spaces/${spaceId}/section`, data.id])
      queryClient.refetchQueries([`spaces/${spaceId}/sections`])
      addToast({
        variant: "success",
        title: "セクションを更新しました。"
      })
    },
    ...config,
    mutationFn: updateSection
  })
}
