import clsx from "clsx"

import { Icon, Link } from "@/components/Elements"
import { NavItem } from "@/components/Nav"

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
  const vocabularyType =
    searchParams.get("vocabulary_type") != null
      ? `&vocabulary_type=${searchParams.get("vocabulary_type")}`
      : ""

  return (
    <NavItem dropDown={dropDown} isActive={sectionId === `${resource.id}`}>
      <Link
        to={`/app/spaces/${spaceId}/vocabularies?sid=${resource.id}${vocabularyType}`}
        className={clsx("block py-1 px-2 truncate")}
      >
        <Icon className="float-left" variant="section" />
        <span className="ml-1 text-h200 text-natural-900 overflow-hidden">
          {resource.name}
        </span>
      </Link>
    </NavItem>
  )
}
