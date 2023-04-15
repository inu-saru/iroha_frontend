import { type AxiosResponse } from "axios"
import { axios } from "@/lib/axios"

export const deleteAuthToken = async (): Promise<AxiosResponse> => {
  return await axios.delete("api/v1/logout")
}
