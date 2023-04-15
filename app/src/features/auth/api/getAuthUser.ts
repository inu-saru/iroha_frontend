import { type AxiosResponse } from "axios"
import { axios } from "@/lib/axios"

import { type AuthUser } from "../types"

export const getAuthUser = async (): Promise<AxiosResponse<AuthUser>> => {
  return await axios.get("api/v1/users/me")
}
