import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"
import {
  type MutationConfig,
  queryClient,
  InfiniteQueryData
} from "@/lib/react-query"
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
  const response = await axios.patch(`/api/v1/spaces/${resourceId}`, data)
  return response.data
}

interface UseUpdateSpaceOptions {
  config?: MutationConfig<typeof updateSpace>
}

export const useUpdateSpace = ({ config }: UseUpdateSpaceOptions = {}) => {
  const { addToast } = useToastStore()

  return useMutation({
    onMutate: async (updatingSpace: any) => {
      await queryClient.cancelQueries(["spaces"])
      const previousSpaces = queryClient.getQueryData<InfiniteQueryData>([
        "spaces"
      ])

      const newSpacesPagesArray =
        previousSpaces?.pages.map((page) => {
          return {
            ...page,
            resources: page.resources.map((space) => {
              return space.id === updatingSpace?.resourceId
                ? { ...space, ...updatingSpace.data }
                : space
            })
          }
        }) ?? []

      queryClient.setQueryData(["spaces"], (previousSpaces: any) => ({
        pages: newSpacesPagesArray,
        pageParams: previousSpaces?.pageParams
      }))

      return { previousSpaces }
    },
    onError: (_, __, context: any) => {
      if (context?.previousSpaces) {
        queryClient.setQueryData(["spaces"], context.previousSpaces)
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(["spaces", data.id])
      addToast({
        variant: "success",
        title: "スペースを更新しました。"
      })
    },
    ...config,
    mutationFn: updateSpace
  })
}
