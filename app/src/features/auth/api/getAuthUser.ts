import { type AxiosResponse } from "axios"
import { axios } from "@/lib/axios"

import { type AuthUser } from "../types"

export const getAuthUser = async (): Promise<AxiosResponse<AuthUser>> => {
  const response = await axios.get("api/v1/users/me")
  return response.data
}
