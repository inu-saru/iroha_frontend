import clsx from "clsx"
import { useNavigate } from "react-router-dom"

import { useSpace } from "@/features/spaces/api/getSpace"
import { Button, Icon, Link } from "@/components/Elements"
import { NavItem } from "@/components/Nav"
import { NavItemsSection } from "@/features/sections"

import { useUrlParams } from "@/lib/useUrlParams"

export const InnerSpaceNav = (): JSX.Element => {
  const { spaceId, searchParams } = useUrlParams()
  const spacesQuery = useSpace({ spaceId })
  const spaceName = spacesQuery.data?.name
  const navigate = useNavigate()

  return (
    <div className="border-r border-natural-40 h-screen bg-white overflow-y-auto">
      <div className="p-2 border-b border-natural-40">
        <Link to={"/app"} className="block">
          <Icon
            className="float-left mr-2"
            bgColor="white"
            variant="arrowLeft"
          />
        </Link>
        <p className="text-h300 text-primary-300">{spaceName}</p>
      </div>
      <Button
        className="m-2"
        onClick={() => {
          navigate(
            `/app/spaces/${spaceId}/vocabularies/new?${searchParams.toString()}`
          )
        }}
      >
        新規作成
      </Button>
      <NavItem isActive={searchParams.get("sid") === null}>
        <Link
          to={`/app/spaces/${spaceId}/vocabularies`}
          className={clsx("block py-1 px-2 truncate")}
        >
          <Icon className="float-left" variant="all" />
          <span className="ml-1 text-h200 text-natural-900 overflow-hidden">
            全てのセクション
          </span>
        </Link>
      </NavItem>
      <NavItemsSection />
    </div>
  )
}
