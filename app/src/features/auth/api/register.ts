import { type AxiosResponse } from "axios"
import { axios } from "@/lib/axios"

import { type AuthUser } from "../types"

export interface RegisterCredentialsDTO {
  email: string
  password: string
  name: string
}

export const registerWithEmailAndPassword = async (
  data: RegisterCredentialsDTO
): Promise<AxiosResponse<AuthUser, any>> => {
  return await axios.post("/api/v1/registration", data)
}
