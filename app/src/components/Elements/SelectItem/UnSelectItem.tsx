import React from "react"
import clsx from "clsx"

interface UnSelectItemProps {
  children: React.ReactNode
  className?: string
}

export const UnSelectItem = ({
  children,
  className = ""
}: UnSelectItemProps): JSX.Element => {

  return (
    <div className={clsx("px-4 py-3 text-natural-90 border border-natural-40 bg-white select-none", className)}>
      {children}
    </div>
  )
}
