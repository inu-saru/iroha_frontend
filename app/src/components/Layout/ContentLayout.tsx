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
        <Nav />
        <div className="p-8">{children}</div>
      </div>
    </>
  )
}
