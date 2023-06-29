import * as React from "react"

import { Head } from "../Head"
import { Nav } from "@/features/nav"

interface ContentLayoutProps {
  children: React.ReactNode
  title: string
}

export const ContentLayout = ({
  title,
  children
}: ContentLayoutProps): JSX.Element => {
  return (
    <>
      <Head title={title} />
      <div className="flex">
        <div className="w-56 h-screen overflow-auto">
          <Nav />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
