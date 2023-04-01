import { useRoutes } from "react-router-dom"

export const AppRoutes = (): JSX.Element => {
  const commonRoutes = [{ path: "/", element: <div>Hello world!</div> }]
  const element = useRoutes([...commonRoutes])

  return <>{element}</>
}
