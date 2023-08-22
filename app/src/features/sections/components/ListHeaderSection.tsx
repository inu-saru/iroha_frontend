import { ListHeader } from "@/components/List"

import { useSection } from "../api/getSection"
import { useUrlParams } from "@/lib/useUrlParams"

export const ListHeaderSection = (): JSX.Element => {
  const { spaceId, searchParams } = useUrlParams()
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
