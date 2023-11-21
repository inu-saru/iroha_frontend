import { useSpaces } from "../api/getSpaces"
import { NavItems } from "@/components/Nav"

import { SpaceNavItem } from "../composer/SpaceNavItem"

export const NavItemsSpace = (): JSX.Element => {
  const spacesQuery = useSpaces()

  return (
    <>
      <NavItems resourcesQuery={spacesQuery} navItem={<SpaceNavItem />} />
    </>
  )
}
