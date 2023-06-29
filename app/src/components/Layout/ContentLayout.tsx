import * as React from "react"

import { Head } from "../Head"

interface ContentLayoutProps {
  children: React.ReactNode
  title: string
  nav: React.ReactElement
  list: React.ReactElement
}

export const ContentLayout = ({
  title,
  nav,
  list,
  children
}: ContentLayoutProps): JSX.Element => {
  return (
    <>
      <Head title={title} />
      <div className="flex">
        <div className="w-56 h-screen overflow-auto">{nav}</div>
        <div className="w-80 h-screen overflow-auto">{list}</div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
