import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type MutationConfig, queryClient } from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Space } from "../types"

export interface CreateSpaceDTO {
  data: {
    body: string
  }
}

export const createSpace = async ({ data }: CreateSpaceDTO): Promise<Space> => {
  const response = await axios.post("/api/v1/spaces", data)
  return response.data
}

interface UseCreateSpaceOptions {
  config?: MutationConfig<typeof createSpace>
}

export const useCreateSpace = ({ config }: UseCreateSpaceOptions = {}) => {
  const { addToast } = useToastStore()

  return useMutation({
    onMutate: async (newSpace) => {
      await queryClient.cancelQueries(["spaces"])

      const previousSpaces = queryClient.getQueryData<Space[]>(["spaces"])

      queryClient.setQueryData(
        ["spaces"],
        [newSpace.data, ...(previousSpaces || [])]
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
        variant: "success",
        title: "スペースを作成しました。"
      })
    },
    ...config,
    mutationFn: createSpace
  })
}
