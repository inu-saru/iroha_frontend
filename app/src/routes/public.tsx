import { lazyImport } from "@/utils/lazyImport"

const { AuthRoutes } = lazyImport(
  async () => await import("@/features/auth"),
  "AuthRoutes"
)

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />
  }
]
