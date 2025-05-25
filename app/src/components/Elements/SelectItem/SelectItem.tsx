import React from "react"
import clsx from "clsx"

const sizes = {
  default: "px-4 py-3",
  minimum: ""
}


interface SelectItemProps {
  size?: keyof typeof sizes
  className?: string
  children: React.ReactNode
}

export const SelectItem = ({
  size = "default",
  className = "",
  children
}: SelectItemProps): JSX.Element => {

  return (
    <div className={clsx("text-natural-900 border border-natural-40 bg-white rounded-md flex items-center", sizes[size], className)}>
      <div className="w-full">{children}</div>
    </div>
  )
}
