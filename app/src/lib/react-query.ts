import { AxiosResponse, type AxiosError } from "axios"
import {
  QueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type DefaultOptions
} from "@tanstack/react-query"
import { type PromiseValue } from "type-fest"

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false
  }
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  PromiseValue<ReturnType<FnType>>

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >

export interface InfiniteQueryData {
  pages: PagenateResponse[]
  pageParams: any
}

export interface PagenateResponse {
  resources: any[]
  currentPage: number
  totalPages: number
  totalCount: number
}

export const pagenateResponse = (
  response: AxiosResponse<any, any>
): PagenateResponse => {
  return {
    resources: response.data,
    currentPage: Number(response.headers["current-page"]),
    totalPages: Number(response.headers["total-pages"]),
    totalCount: Number(response.headers["total-count"])
  }
}
