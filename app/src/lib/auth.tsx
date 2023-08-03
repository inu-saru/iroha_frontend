import { type AxiosResponse } from "axios"
import { configureAuth } from "react-query-auth"
import {
  loginWithEmailAndPassword,
  type LoginCredentialsDTO
} from "@/features/auth/api/login"
import {
  registerWithEmailAndPassword,
  type RegisterCredentialsDTO
} from "@/features/auth/api/register"

import storage from "@/utils/storage"
import { type AuthUser } from "@/features/auth/types"
import { getAuthUser } from "@/features/auth/api/getAuthUser"
import { deleteAuthToken } from "@/features/auth/api/deleteAuthToken"

const handleUserResponse = (data: any): any => {
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

const registerFn = async (data: RegisterCredentialsDTO): Promise<AuthUser> => {
  const response = await registerWithEmailAndPassword(data)
  const user = handleUserResponse(response)
  return user
}

const logoutFn = async (): Promise<void> => {
  await deleteAuthToken()
  storage.clearToken()
}

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn,
    loginFn,
    registerFn,
    logoutFn
  })
