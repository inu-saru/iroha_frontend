import * as React from "react"

import { Head } from "@/components/Elements"

interface ListLayoutProps {
  children: React.ReactNode
  title: string
  nav: React.ReactElement
}

export const ListLayout = ({
  title,
  nav,
  children
}: ListLayoutProps): JSX.Element => {
  return (
    <>
      <Head title={title} />
      <div className="flex">
        <div className="w-56 h-screen overflow-auto">{nav}</div>
        <div className="w-80 flex-1">{children}</div>
      </div>
    </>
  )
}
