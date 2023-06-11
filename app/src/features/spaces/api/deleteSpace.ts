import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type MutationConfig, queryClient } from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Space } from "../types"

export const deleteSpace = async ({ spaceId }: { spaceId: string }) => {
  return await axios.delete(`/api/v1/spaces/${spaceId}`)
}

interface UseDeleteSpaceOptions {
  config?: MutationConfig<typeof deleteSpace>
}

export const useDeleteSpace = ({ config }: UseDeleteSpaceOptions) => {
  const { addToast } = useToastStore()
  return useMutation({
    onMutate: async (deletedSpace) => {
      await queryClient.cancelQueries(["spaces"])

      const previousSpaces = queryClient.getQueryData<Space[]>(["spaces"])

      queryClient.setQueryData(
        ["spaces"],
        previousSpaces?.filter((space) => space.id !== deletedSpace.spaceId)
      )

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
        type: "success",
        title: "スペースを削除しました。"
      })
    },
    ...config,
    mutationFn: deleteSpace
  })
}
