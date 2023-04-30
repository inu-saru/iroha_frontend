import * as React from "react"
import { ErrorBoundary } from "react-error-boundary"
import { HelmetProvider } from "react-helmet-async"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter as Router } from "react-router-dom"

import { Spinner } from "@/components/Elements"

import { AuthLoader } from "@/lib/auth"
import { queryClient } from "@/lib/react-query"

const ErrorFallback = (): JSX.Element => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
    </div>
  )
}

interface AppProviderProps {
  children: React.ReactNode
}

const loading = (
  <div className="flex items-center justify-center w-screen h-screen">
    <Spinner />
  </div>
)

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <React.Suspense fallback={loading}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
            {/* <Toast /> */}
            <AuthLoader renderLoading={() => loading}>
              <Router>{children}</Router>
            </AuthLoader>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}
