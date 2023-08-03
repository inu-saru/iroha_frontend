import React from "react"
import clsx from "clsx"

import { Icon, type IconVariant, Link } from "../Elements"

interface NavItemProps {
  resourceId: string
  isActive?: boolean
  to?: string
  icon?: IconVariant
  label: string
  dropDown?: JSX.Element | undefined
}

export const NavItem = ({
  resourceId,
  isActive = false,
  to = "/app",
  icon,
  label,
  dropDown = undefined
}: NavItemProps): JSX.Element => {
  const dropDownWithResourceId =
    dropDown !== undefined
      ? React.cloneElement(dropDown, {
          resourceId,
          label
        })
      : undefined

  return (
    <>
      <li
        key={resourceId}
        className="h-8 hover:bg-primary-20 relative group list-none"
      >
        <Link
          to={to}
          className={clsx(
            "block py-1 px-2 truncate",
            isActive && "bg-primary-30"
          )}
        >
          <Icon className="float-left" variant={icon} />
          <span className="ml-1 text-h200 text-natural-900 overflow-hidden">
            {label}
          </span>
        </Link>
        {dropDown !== undefined && (
          <div className="absolute w-max inset-y-0 right-2 top-1 h-6 opacity-0 invisible group-hover:visible opacity-100">
            {dropDownWithResourceId}
          </div>
        )}
      </li>
    </>
  )
}
