import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

export const deleteSection = async ({ sectionId }: { sectionId: string }) => {
  return await axios.delete(
    `/api/v1/spaces/${thisSpaceId}/sections/${sectionId}`
  )
}

let thisSpaceId: string

interface UseDeleteSectionOptions {
  spaceId: string | undefined
  config?: MutationConfig<typeof deleteSection>
}

export const useDeleteSection = ({
  config,
  spaceId
}: UseDeleteSectionOptions) => {
  const { addToast } = useToastStore()
  return useMutation({
    onMutate: async (deletedSection) => {
      await queryClient.cancelQueries([`spaces/${spaceId}/sections`])
      thisSpaceId = spaceId ?? ""

      const previousSections = queryClient.getQueryData<InfiniteQueryData>([
        `spaces/${spaceId}/sections`
      ])

      const newPagesArray =
        previousSections?.pages.map((page) => {
          return {
            ...page,
            resources: page.resources.filter((space) => {
              return space.id !== deletedSection.sectionId
            })
          }
        }) ?? []

      queryClient.setQueryData(
        [`spaces/${spaceId}/sections`],
        (previousSections: any) => ({
          pages: newPagesArray,
          pageParams: previousSections?.pageParams
        })
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
        title: "セクションを削除しました。"
      })
    },
    ...config,
    mutationFn: deleteSection
  })
}
