import { Suspense } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { Spinner } from "@/components/Elements"
import { MainLayout } from "@/components/Layout"
import { lazyImport } from "@/utils/lazyImport"

const { Dashboard } = lazyImport(
  async () => await import("@/features/misc"),
  "Dashboard"
)

const App = (): JSX.Element => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
    children: [{ path: "", element: <Dashboard /> }]
  },
  { path: "/auth/*", element: <Navigate to="/app" /> }
]
