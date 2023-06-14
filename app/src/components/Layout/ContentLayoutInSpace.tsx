import * as React from "react"

import { Head } from "../Head"
import { SpaceNav } from "@/features/nav"

interface ContentLayoutInSpaceProps {
  children: React.ReactNode
  title: string
}

export const ContentLayoutInSpace = ({
  title,
  children
}: ContentLayoutInSpaceProps): JSX.Element => {
  return (
    <>
      <Head title={title} />
      <div className="flex">
        <SpaceNav />
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
