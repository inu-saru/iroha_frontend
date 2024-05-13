import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from "react-router-dom"

import { useUser } from "@/lib/auth"

import { protectedRoutes } from "./protected"
import { publicRoutes } from "./public"
import { Landing, NotFound } from "@/features/misc"

const AppLayout = () => (
  <>
    <ScrollRestoration />
    <Outlet />
  </>
);

export const AppRoutes = (): JSX.Element => {
  const user = useUser()
  const commonRoutes = [
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <Landing /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ]
  const routes = user.data ? protectedRoutes : publicRoutes
  const element = createBrowserRouter([...routes, ...commonRoutes])

  return <RouterProvider router={element} />
}
