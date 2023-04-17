import { useRoutes } from "react-router-dom"

import { useUser } from "@/lib/auth"

import { protectedRoutes } from "./protected"
import { publicRoutes } from "./public"

export const AppRoutes = (): JSX.Element => {
  const user = useUser()
  const commonRoutes = [{ path: "/", element: <div>Hello world!</div> }]
  const routes = user.data ? protectedRoutes : publicRoutes
  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
