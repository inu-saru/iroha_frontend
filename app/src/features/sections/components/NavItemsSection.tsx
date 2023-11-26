import { useSections } from "../api/getSections"
import { NavItems } from "@/components/Nav"

import { SectionNavItem } from "../composer/SectionNavItem"
import { useUrlParams } from "@/lib/useUrlParams"

export const NavItemsSection = (): JSX.Element => {
  const { spaceId } = useUrlParams()
  const sectionsQuery = useSections({
    spaceId
  })

  return (
    <>
      <NavItems resourcesQuery={sectionsQuery} navItem={<SectionNavItem />} />
    </>
  )
}
