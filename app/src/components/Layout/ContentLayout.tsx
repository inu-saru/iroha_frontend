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
    <div className="w-96 flex-1">{children}</div>
  )
}
