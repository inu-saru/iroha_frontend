import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import { type MutationConfig, queryClient } from "@/lib/react-query"
import { useToastStore } from "@/stores/toasts"

import { type Space } from "../types"

export interface UpdateSpaceDTO {
  data: {
    body: string
  }
  resourceId: string
}

export const updateSpace = async ({
  data,
  resourceId
}: UpdateSpaceDTO): Promise<Space> => {
  return await axios.patch(`/api/v1/spaces/${resourceId}`, data)
}

interface UseUpdateSpaceOptions {
  config?: MutationConfig<typeof updateSpace>
}

export const useUpdateSpace = ({ config }: UseUpdateSpaceOptions = {}) => {
  const { addToast } = useToastStore()

  return useMutation({
    onMutate: async (updatingSpace: any) => {
      await queryClient.cancelQueries(["spaces", updatingSpace?.resourceId])

      const previousSpace = queryClient.getQueryData<Space>([
        "spaces",
        updatingSpace?.resourceId
      ])

      queryClient.setQueryData(["spaces", updatingSpace?.resourceId], {
        ...previousSpace,
        ...updatingSpace.data,
        id: updatingSpace.resourceId
      })

      return { previousSpace }
    },
    onError: (_, __, context: any) => {
      if (context?.previousSpace) {
        queryClient.setQueryData(
          ["spaces", context.previousSpace.id],
          context.previousSpace
        )
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["spaces", data.id])
      addToast({
        type: "success",
        title: "Space Updated"
      })
    },
    ...config,
    mutationFn: updateSpace
  })
}
