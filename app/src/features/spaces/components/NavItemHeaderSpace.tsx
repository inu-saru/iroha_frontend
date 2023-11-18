import React from "react"

import { Icon } from "@/components/Elements"
import { NavHeader } from "@/components/Nav"

interface NavItemHeaderSpaceProps {
  toggle: () => void
}

export const NavItemHeaderSpace = ({
  toggle
}: NavItemHeaderSpaceProps): JSX.Element => {
  return (
    <NavHeader title="スペース">
      <div onClick={toggle}>
        <Icon variant="add" bgColor="white" />
      </div>
    </NavHeader>
  )
}
