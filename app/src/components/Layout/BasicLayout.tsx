import * as React from "react"

import { Head } from "../Head"

interface BasicLayoutProps {
  children: React.ReactNode
  title: string
  nav: React.ReactElement
}

export const BasicLayout = ({
  title,
  nav,
  children
}: BasicLayoutProps): JSX.Element => {
  return (
    <>
      <Head title={title} />
      <div className="flex">
        <div className="w-56 h-screen overflow-auto">{nav}</div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
