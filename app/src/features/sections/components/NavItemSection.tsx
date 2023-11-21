import clsx from "clsx"

import { Icon, Link } from "@/components/Elements"
import { NewNavItem } from "@/components/Nav/NewNavItem"

import { type Section } from "../types"
import { useUrlParams } from "@/lib/useUrlParams"

interface NavItemSectionProps {
  resource: Section | any
  dropDown?: JSX.Element
}

export const NavItemSection = ({
  resource,
  dropDown
}: NavItemSectionProps): JSX.Element => {
  const { spaceId, searchParams } = useUrlParams()
  const sectionId = searchParams.get("sid") ?? null

  return (
    <NewNavItem dropDown={dropDown} isActive={sectionId === `${resource.id}`}>
      <Link
        to={`/app/spaces/${spaceId}/vocabularies?sid=${resource.id}`}
        className={clsx("block py-1 px-2 truncate")}
      >
        <Icon className="float-left" variant="section" />
        <span className="ml-1 text-h200 text-natural-900 overflow-hidden">
          {resource.name}
        </span>
      </Link>
    </NewNavItem>
  )
}
