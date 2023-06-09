import React from "react"
import { Link } from "react-router-dom"
import { Icon } from "../Elements"

interface NavItemProps {
  resourceId: string
  to?: string
  icon?: string
  label: string
  dropDown?: JSX.Element | undefined
}

export const NavItem = ({
  resourceId,
  to = "./",
  icon,
  label,
  dropDown = undefined
}: NavItemProps): JSX.Element => {
  const dropDownWithResourceId = React.cloneElement(dropDown, {
    resourceId,
    label
  })

  return (
    <>
      <li key={resourceId} className="h-8 hover:bg-primary-20 relative group">
        <Link to={to} className="block py-1 px-2 truncate">
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
