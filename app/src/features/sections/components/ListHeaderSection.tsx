import { ListHeader } from "@/components/List"
import { useParams, useSearchParams } from "react-router-dom"
import { useSection } from "../api/getSection"

export const ListHeaderSection = (): JSX.Element => {
  const { spaceId } = useParams<{
    spaceId: string
  }>()
  const [searchParams] = useSearchParams()
  const sectionId = searchParams.get("sid") ?? null

  const sectionQuery = useSection({ spaceId, sectionId })

  const label =
    sectionQuery.data !== null ? sectionQuery.data?.name : "全てのセクション"

  return (
    <>
      <ListHeader label={label} />
    </>
  )
}
