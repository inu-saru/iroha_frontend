import { type AxiosResponse } from "axios"
import { axios } from "@/lib/axios"

import { type AuthUser } from "../types"

export interface LoginCredentialsDTO {
  email: string
  password: string
}

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<AxiosResponse<AuthUser, any>> => {
  return await axios.post("/api/v1/login", data)
}
