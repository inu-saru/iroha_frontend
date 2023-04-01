import * as React from "react"
import { ErrorBoundary } from "react-error-boundary"
import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter as Router } from "react-router-dom"

import { Spinner } from "@/components/Elements"
const queryClient = new QueryClient()

// import { AuthProvider } from "@/lib/auth"
// import { queryClient } from "@/lib/react-query"

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

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
            {/* <Toast /> */}
            {/* <AuthProvider> */}
            <Router>{children}</Router>
            {/* </AuthProvider> */}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}
