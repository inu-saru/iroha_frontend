import * as React from "react"

import { Head } from "@/components/Elements"

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
        <div className="w-56 h-screen overflow-auto max-md:hidden">{nav}</div>
        <div className="w-80 h-screen overflow-auto max-md:w-56">{list}</div>
        <div className="w-96 flex-1">{children}</div>
      </div>
    </>
  )
}
