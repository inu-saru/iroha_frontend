import { axios } from "@/lib/axios"

import { type AuthUser } from "../types"

export interface LoginCredentialsDTO {
  email: string
  password: string
}

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<AuthUser> => {
  return await axios.post("/api/v1/login", data)
}
