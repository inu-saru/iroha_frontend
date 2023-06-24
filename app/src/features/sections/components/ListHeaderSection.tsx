import { ListHeader } from "@/components/List"
import { useParams } from "react-router-dom"
import { useSection } from "../api/getSection"

export const ListHeaderSection = (): JSX.Element => {
  const { spaceId, sectionId } = useParams<{
    spaceId: string
    sectionId: string
  }>()

  const sectionQuery =
    sectionId !== undefined ? useSection({ spaceId, sectionId }) : undefined

  const label =
    sectionQuery !== undefined ? sectionQuery.data?.name : "全てのセクション"

  return (
    <>
      <ListHeader label={label} />
    </>
  )
}
