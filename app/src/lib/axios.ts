import Axios, { type AxiosRequestConfig } from "axios"

import { API_URL } from "@/config"
import storage from "@/utils/storage"

export const axios = Axios.create({
  baseURL: API_URL
})

const authRequestInterceptor = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const token = storage.getToken()
  if (token) {
    config.headers.authorization = `${token}`
  }
  config.headers.Accept = "application/json"
  return config
}

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const message = error.response?.data?.message || error.message
    console.log(`WIP api response error ${message}`)
    if (error.response.status === 401) {
      storage.clearToken()
    }

    return await Promise.reject(error)
  }
)
