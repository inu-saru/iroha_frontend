import { useRoutes } from "react-router-dom"

import { publicRoutes } from "./public"

export const AppRoutes = (): JSX.Element => {
  const commonRoutes = [{ path: "/", element: <div>Hello world!</div> }]
  const routes = publicRoutes
  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
