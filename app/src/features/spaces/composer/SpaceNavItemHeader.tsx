import React from "react"
import { SwitcherDisplay } from "@/components/Elements"
import { NavItemHeaderSpace } from "../components/NavItemHeaderSpace"
import { NavItemSpaceCreate } from "../components/NavItemSpaceCreate"

export const SpaceNavItemHeader = (): JSX.Element => {
  return (
    <SwitcherDisplay>
      {(methods) => (
        <>
          <NavItemHeaderSpace toggle={methods.toggle} />
          {methods.isOpen && (
            <div ref={methods.clickAway}>
              <NavItemSpaceCreate toggle={methods.toggle} />
            </div>
          )}
        </>
      )}
    </SwitcherDisplay>
  )
}
