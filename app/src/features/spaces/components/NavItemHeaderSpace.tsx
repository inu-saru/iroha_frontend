import React from "react"

import { Icon, Link } from "@/components/Elements"
import { NavHeader } from "@/components/Nav"


export const NavItemHeaderSpace = (): JSX.Element => {
  return (
    <NavHeader title="スペース">
      <Link to="/app/spaces/new">
        <div>
          <Icon variant="add" bgColor="white" />
        </div>
      </Link>
    </NavHeader>
  )
}
