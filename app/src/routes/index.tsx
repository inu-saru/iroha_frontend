import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { useUser } from "@/lib/auth"

import { protectedRoutes } from "./protected"
import { publicRoutes } from "./public"
import { Landing, NotFound } from "@/features/misc"

export const AppRoutes = (): JSX.Element => {
  const user = useUser()
  const commonRoutes = [
    { path: "/", element: <Landing /> },
    { path: "*", element: <NotFound /> }
  ]
  const routes = user.data ? protectedRoutes : publicRoutes
  const element = createBrowserRouter([...routes, ...commonRoutes])

  return <RouterProvider router={element} />
}
