import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useSpace } from "@/features/spaces/api/getSpace"
import { Button, Icon, Link } from "@/components/Elements"
import { lazyImport } from "@/utils/lazyImport"
import { NavItem } from "@/components/Nav"
const { NavSections } = lazyImport(
  async () => await import("@/features/sections"),
  "NavSections"
)

export const InnerSpaceNav = (): JSX.Element => {
  const { spaceId } = useParams<{ spaceId: string }>()
  const spacesQuery = useSpace({ spaceId })
  const [searchParams] = useSearchParams()
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
      <NavItem
        isActive={searchParams.get("sid") === null}
        resourceId="all"
        label="全てのセクション"
        to={`/app/spaces/${spaceId}/vocabularies`}
        icon="all"
      />
      <NavSections spaceId={spaceId} />
    </div>
  )
}
