import * as React from "react"

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <>
      <div>{children}</div>
    </>
  )
}
