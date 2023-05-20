import { type AxiosResponse } from "axios"
import { axios } from "@/lib/axios"

export const deleteAuthToken = async (): Promise<AxiosResponse> => {
  const response = axios.delete("api/v1/logout")
  return response.data
}
