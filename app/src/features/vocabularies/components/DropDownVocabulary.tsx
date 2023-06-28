import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { DropDown } from "@/components/DropDown"
import { DropDownItem } from "@/components/DropDown/DropDownItem"
import { Icon } from "@/components/Elements"

interface DropDownVocabularyProps {
  resourceId: string
  label: string
  deleteToggle: () => void
}

export const DropDownVocabulary = ({
  resourceId,
  label,
  deleteToggle
}: DropDownVocabularyProps): JSX.Element => {
  const { spaceId } = useParams<{
    spaceId: string
  }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  return (
    <DropDown trigger={<Icon variant="moreHoriz" bgColor="white" />}>
      <DropDownItem
        label="編集"
        handleClick={() => {
          navigate(
            `/app/spaces/${spaceId}/vocabularies/${resourceId}/edit?${searchParams.toString()}`
          )
        }}
      />
      <DropDownItem
        label="削除"
        handleClick={async () => {
          deleteToggle({
            vocabularyId: resourceId,
            label
          })
        }}
      />
    </DropDown>
  )
}
