import { Suspense } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { Spinner } from "@/components/Elements"
import { MainLayout } from "@/components/Layout"
import { lazyImport } from "@/utils/lazyImport"
import { Vocabulary } from "@/features/vocabularies/routes/Vocabulary"
import { VocabularyCreate } from "@/features/vocabularies/routes/VocabularyCreate"

const { Dashboard } = lazyImport(
  async () => await import("@/features/misc"),
  "Dashboard"
)
const { Vocabularies } = lazyImport(
  async () => await import("@/features/vocabularies/routes/Vocabularies"),
  "Vocabularies"
)
const { VocabularyUpdate } = lazyImport(
  async () => await import("@/features/vocabularies/routes/VocabularyUpdate"),
  "VocabularyUpdate"
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
    children: [
      {
        path: "spaces/:spaceId/vocabularies/new",
        element: <VocabularyCreate />
      },
      {
        path: "spaces/:spaceId/vocabularies/:vocabularyId/edit",
        element: <VocabularyUpdate />
      },
      {
        path: "spaces/:spaceId/vocabularies/:vocabularyId",
        element: <Vocabulary />
      },
      { path: "spaces/:spaceId/vocabularies", element: <Vocabularies /> },
      { path: "", element: <Dashboard /> }
    ]
  },
  { path: "/auth/*", element: <Navigate to="/app" /> }
]
