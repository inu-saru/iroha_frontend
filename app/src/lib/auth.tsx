import { type AxiosResponse } from "axios"
import { configureAuth } from "react-query-auth"
import {
  loginWithEmailAndPassword,
  type LoginCredentialsDTO
} from "@/features/auth/api/login"

import storage from "@/utils/storage"
import { type AuthUser } from "@/features/auth/types"
import { getAuthUser } from "@/features/auth/api/getAuthUser"
import { deleteAuthToken } from "@/features/auth/api/deleteAuthToken"

const handleUserResponse = (data: AxiosResponse<AuthUser>): any => {
  const jwt = data?.headers?.get("authorization")
  storage.setToken(jwt)
  return data.data
}

const userFn = (): any => {
  if (storage.getToken()) {
    const data = getAuthUser()
    return data
  }
  return null
}

const loginFn = async (data: LoginCredentialsDTO): Promise<AuthUser> => {
  const response = await loginWithEmailAndPassword(data)
  const user = handleUserResponse(response)
  return user
}

const registerFn = (): void => {
  console.log("WIP registerFn")
}

const logoutFn = async (): Promise<void> => {
  await deleteAuthToken()
  storage.clearToken()
  window.location.assign(window.location.origin as unknown as string)
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn
  })
