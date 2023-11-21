import { useSections } from "../api/getSections"
import { NewNavItems } from "@/components/Nav/NewNavItems"

import { SectionNavItem } from "../composer/SectionNavItem"
import { useUrlParams } from "@/lib/useUrlParams"

export const NavItemsSection = (): JSX.Element => {
  const { spaceId } = useUrlParams()
  const sectionsQuery = useSections({
    spaceId
  })

  return (
    <>
      <NewNavItems
        resourcesQuery={sectionsQuery}
        navItem={<SectionNavItem />}
      />
    </>
  )
}
