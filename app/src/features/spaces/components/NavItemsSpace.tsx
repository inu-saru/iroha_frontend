import { useSpaces } from "../api/getSpaces"
import { NewNavItems } from "@/components/Nav/NewNavItems"

import { SpaceNavItem } from "../composer/SpaceNavItem"

export const NavItemsSpace = (): JSX.Element => {
  const spacesQuery = useSpaces()

  return (
    <>
      <NewNavItems resourcesQuery={spacesQuery} navItem={<SpaceNavItem />} />
    </>
  )
}
