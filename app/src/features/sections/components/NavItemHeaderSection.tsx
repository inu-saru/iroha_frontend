import React from "react"

import { Icon } from "@/components/Elements"
import { NavHeader } from "@/components/Nav"

interface NavItemHeaderSectionProps {
  toggle: () => void
}

export const NavItemHeaderSection = ({
  toggle
}: NavItemHeaderSectionProps): JSX.Element => {
  return (
    <NavHeader title="セクション">
      <div onClick={toggle}>
        <Icon variant="add" bgColor="white" />
      </div>
    </NavHeader>
  )
}
