import React from "react"
import { SwitcherDisplay } from "@/components/Elements"
import { NavItemHeaderSpace } from "../components/NavItemHeaderSpace"

export const SpaceNavItemHeader = (): JSX.Element => {
  return (
    <SwitcherDisplay>
      {(methods) => (
        <>
          <NavItemHeaderSpace />
        </>
      )}
    </SwitcherDisplay>
  )
}
