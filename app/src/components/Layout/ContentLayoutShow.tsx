import * as React from "react"

import { Head } from "../Head"

interface ContentLayoutShowProps {
  children: React.ReactNode
  title: string
  nav: React.ReactElement
  list: React.ReactElement
}

export const ContentLayoutShow = ({
  title,
  nav,
  list,
  children
}: ContentLayoutShowProps): JSX.Element => {
  return (
    <>
      <Head title={title} />
      <div className="flex">
        {nav}
        <div className="flex-initial w-80 border-r border-natural-40">
          {list}
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
