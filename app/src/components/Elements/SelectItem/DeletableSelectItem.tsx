import React from "react"
import clsx from "clsx"
import { Icon } from "./../../Elements"

interface DeletableSelectItemProps {
  className?: string
  children: React.ReactNode
  deleteItem: () => void
}

export const DeletableSelectItem = ({
  className = "",
  children,
  deleteItem
}: DeletableSelectItemProps): JSX.Element => {

  return (
    <div className={clsx("px-4 py-3 text-natural-900 border border-natural-40 bg-white rounded-md flex items-center", className)}>
      <div className="w-full">{children}</div>
      <div className="ml-2" onClick={() => { deleteItem() }}>
        <Icon variant="close" bgColor="white" />
      </div>
    </div>
  )
}
