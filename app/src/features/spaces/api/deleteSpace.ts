import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type MutationConfig, queryClient } from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

export const deleteSpace = async ({ spaceId }: { spaceId: string }) => {
  return await axios.delete(`/api/v1/spaces/${spaceId}`)
}

interface UseDeleteSpaceOptions {
  config?: MutationConfig<typeof deleteSpace>
}

export const useDeleteSpace = ({ config }: UseDeleteSpaceOptions = {}) => {
  const { addToast } = useToastStore()
  return useMutation({
    onMutate: async (deletedSpace) => {
      await queryClient.cancelQueries(["spaces"])

      const previousSpaces = queryClient.getQueryData<InfiniteQueryData>([
        "spaces"
      ])

      const newPagesArray =
        previousSpaces?.pages.map((page) => {
          return {
            ...page,
            resources: page.resources.filter((space) => {
              return space.id !== deletedSpace.spaceId
            })
          }
        }) ?? []

      queryClient.setQueryData(["spaces"], (previousSpaces: any) => ({
        pages: newPagesArray,
        pageParams: previousSpaces?.pageParams
      }))

      return { previousSpaces }
    },
    onError: (_, __, context: any) => {
      if (context?.previousSpaces) {
        queryClient.setQueryData(["spaces"], context.previousSpaces)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["spaces"])
      addToast({
        variant: "success",
        title: "スペースを削除しました。"
      })
    },
    ...config,
    mutationFn: deleteSpace
  })
}
