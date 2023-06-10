import { useParams } from "react-router-dom"
import { useSpace } from "@/features/spaces/api/getSpace"
import { Icon, Link } from "@/components/Elements"

export const SpaceNav = (): JSX.Element => {
  const { spaceId } = useParams<{ spaceId: string }>()
  const spacesQuery = useSpace({ spaceId })
  const spaceName = spacesQuery.data?.name

  return (
    <div className="w-56 border-r border-natural-40 h-screen bg-white">
      <div className="p-2 border-b border-natural-40">
        <Link to={"../"} className="block">
          <Icon
            className="float-left mr-2"
            bgColor="white"
            variant="arrowLeft"
          />
        </Link>
        <p className="text-h300 text-primary-300">{spaceName}</p>
      </div>
    </div>
  )
}
