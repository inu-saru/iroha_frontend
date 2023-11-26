import clsx from "clsx"

import { Icon, Link } from "@/components/Elements"
import { NavItem } from "@/components/Nav"

import { type Space } from "../types"

interface NavItemSpaceProps {
  resource: Space | any
  dropDown?: JSX.Element
}

export const NavItemSpace = ({
  resource,
  dropDown
}: NavItemSpaceProps): JSX.Element => {
  return (
    <NavItem dropDown={dropDown}>
      <Link
        to={`/app/spaces/${resource.id}/vocabularies`}
        className={clsx("block py-1 px-2 truncate")}
      >
        <Icon className="float-left" variant="space" />
        <span className="ml-1 text-h200 text-natural-900 overflow-hidden">
          {resource.name}
        </span>
      </Link>
    </NavItem>
  )
}
